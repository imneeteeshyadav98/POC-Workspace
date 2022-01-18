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

echo "Update values.yml ..."
cat << EOF  > velero-values.yml
schedules:
  velerobackup:
    disabled: false
    labels:
      myenv: veleronamespace
    annotations:
      myenv: veleronamespace
    schedule: " 30 8 * * * "
    useOwnerReferencesInBackup: true
    template:
      ttl: "240h"
EOF

echo "Staring velero..."
helm upgrade velerobackupstagingwus01 vmware-tanzu/velero --namespace veleronamespace --values=velero-values.yml  --version 2.13.2 \
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

