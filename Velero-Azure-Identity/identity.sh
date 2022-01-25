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