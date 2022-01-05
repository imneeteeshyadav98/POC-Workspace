#Define the variables.
SUBSCRIPTION="307229a7-f578-4e4c-b96e-522183580ae3"
VELERO_RESOURCE_GROUP_NAME="k8s-resource-01"
VELERO_STORAGE_ACCOUNT_NAME="k8svelerobackup01" 
VELERO_BLOB_CONTAINER_NAME="k8svelerobackup"
LOCATION="westus"
VELERO_SP_NAME="velerobackup"
AKS_RESOURCE_GROUP="MC_k8s-resource-01_k8s-cluster-01_westus"


#Create a resource group for the backup storage account.
echo "Creating resource group..."
az account set --subscription $SUBSCRIPTION
az group create --location $LOCATION --name $VELERO_RESOURCE_GROUP_NAME

#Create the storage account.
echo "Creating storage account..."
az storage account create --name $VELERO_STORAGE_ACCOUNT_NAME --resource-group $VELERO_RESOURCE_GROUP_NAME --location $LOCATION --kind StorageV2 --sku Standard_GRS --encryption-services blob --https-only true --access-tier Hot
  
#Create Blob Container.
echo "Creating Blob Container..."
az storage container create --name $VELERO_BLOB_CONTAINER_NAME --public-access off --account-name $VELERO_STORAGE_ACCOUNT_NAME

#Set permissions for Velero.
echo "Adding permissions for Velero..."
VELERO_SP_APP_PASSWORD=$(az ad sp create-for-rbac --name $VELERO_SP_NAME --role "Contributor" --query 'password' --output tsv)
VELERO_SP_APP_ID=$(az ad sp list --display-name $VELERO_SP_NAME --query [0].appId --output tsv)
SUBSCRIPTION_ID=$(az account show --subscription $SUBSCRIPTION --query id --output tsv)
SUBSCRIPTION_TENANT_ID=$(az account show --subscription $SUBSCRIPTION --query tenantId --output tsv)


#Save Velero credentials to local file.
echo "Saving velero credentials to local file: credentials-velero..."
cat << EOF  > ./credentials-velero
AZURE_SUBSCRIPTION_ID="${SUBSCRIPTION_ID}"
AZURE_TENANT_ID="${SUBSCRIPTION_TENANT_ID}"
AZURE_CLIENT_ID="${VELERO_SP_APP_ID}"
AZURE_CLIENT_SECRET="${VELERO_SP_APP_PASSWORD}"
AZURE_RESOURCE_GROUP="${AKS_RESOURCE_GROUP}"
EOF

az account set --subscription 307229a7-f578-4e4c-b96e-522183580ae3
az aks get-credentials --resource-group k8s-resource-01 --name k8s-cluster-02

kubectl create namespace veleronamespace


echo "velero helm repo adding..........."
helm repo add vmware-tanzu https://vmware-tanzu.github.io/helm-charts

echo "Update values.yml ..."
cat << EOF  > velero-values.yml
schedules:
  velerobackup:
    disabled: false
    labels:
      myenv: veleronamespace
    annotations:
      myenv: veleronamespace
    schedule: " 25  7 * * * "
    useOwnerReferencesInBackup: true
    template:
      ttl: "240h"
EOF

echo "Staring velero..."
helm install velerobackupstagingwus02 vmware-tanzu/velero --namespace veleronamespace --values=velero-values.yml  --version 2.13.2 \
	--set nodeSelector."beta\\.kubernetes\\.io/os"=linux \
	--set initContainers[0].name=velero-plugin-for-microsoft-azure \
	--set initContainers[0].image=velero/velero-plugin-for-microsoft-azure:master \
	--set initContainers[0].volumeMounts[0].mountPath=/target \
	--set initContainers[0].volumeMounts[0].name=plugins \
	--set "initContainers[0].name=velero-plugin-for-azure" \
	--set-file credentials.secretContents.cloud=./credentials-velero  \
	--set configuration.provider='azure' \
	--set configuration.backupStorageLocation.bucket=$VELERO_BLOB_CONTAINER_NAME \
	--set configuration.backupStorageLocation.config.resourceGroup=$VELERO_RESOURCE_GROUP_NAME \
	--set configuration.backupStorageLocation.config.storageAccount=$VELERO_STORAGE_ACCOUNT_NAME \
	--set configuration.backupStorageLocation.config.subscriptionId=$SUBSCRIPTION \
	--set configuration.volumeSnapshotLocation.name=$LOCATION \
	--set configuration.volumeSnapshotLocation.config.resourceGroup=$VELERO_RESOURCE_GROUP_NAME \
	--set configuration.volumeSnapshotLocation.config.subscriptionId=$SUBSCRIPTION

