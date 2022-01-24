SUBSCRIPTION="307229a7-f578-4e4c-b96e-522183580ae3"
VELERO_RESOURCE_GROUP_NAME="k8s-resource-01"
VELERO_STORAGE_ACCOUNT_NAME="k8svelerobackup01" 
VELERO_BLOB_CONTAINER_NAME="k8svelerobackup"
LOCATION="westus"
VELERO_SP_NAME="k8svelerobackup"
AKS_RESOURCE_GROUP="MC_k8s-resource-01_k8s-cluster-01_westus"
IDENTITY_NAME="k8svelero"



az identity create --subscription $SUBSCRIPTION --resource-group $VELERO_RESOURCE_GROUP_NAME --name $IDENTITY_NAME
IDENTITY_CLIENT_ID="$(az identity show -g $VELERO_RESOURCE_GROUP_NAME -n $IDENTITY_NAME --subscription $SUBSCRIPTION --query clientId -otsv)"
IDENTITY_RESOURCE_ID="$(az identity show -g $VELERO_RESOURCE_GROUP_NAME -n $IDENTITY_NAME --subscription $SUBSCRIPTION --query id -otsv)"  
IDENTITY_ASSIGNMENT_ID="$(az role assignment create --role Contributor --assignee $IDENTITY_CLIENT_ID --scope /subscriptions/$SUBSCRIPTION --query id -otsv)"  


cat <<EOF | kubectl apply -f -
apiVersion: "aadpodidentity.k8s.io/v1"
kind: AzureIdentity
metadata:
  name: $IDENTITY_NAME
spec:
  type: 0
  resourceID: $IDENTITY_RESOURCE_ID
  clientID: $IDENTITY_CLIENT_ID
EOF

cat <<EOF | kubectl apply -f -
apiVersion: "aadpodidentity.k8s.io/v1"
kind: AzureIdentityBinding
metadata:
  name: $IDENTITY_NAME-binding
spec:
  azureIdentity: $IDENTITY_NAME
  selector: $IDENTITY_NAME
EOF


cat << EOF  > ./credentials-velero
AZURE_SUBSCRIPTION_ID=${AZURE_SUBSCRIPTION_ID}
AZURE_RESOURCE_GROUP=${AZURE_RESOURCE_GROUP}
AZURE_CLOUD_NAME=AzurePublicCloud
EOF

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

AZURE_STORAGE_ACCOUNT_ACCESS_KEY=`az storage account keys list --account-name $AZURE_STORAGE_ACCOUNT_ID --query "[?keyName == 'key1'].value" -o tsv`

cat << EOF  > ./credentials-velero
AZURE_STORAGE_ACCOUNT_ACCESS_KEY=${AZURE_STORAGE_ACCOUNT_ACCESS_KEY}
AZURE_CLOUD_NAME=AzurePublicCloud
EOF