#Define the variables.
SUBSCRIPTION="307229a7-f578-4e4c-b96e-522183580ae3"
VELERO_RESOURCE_GROUP_NAME="k8s-resource-01"
VELERO_STORAGE_ACCOUNT_NAME="k8svelerobackup01"
VELERO_BLOB_CONTAINER_NAME="k8svelerobackup"
VELERO_BLOB_FILESHARE_NAME="k8sfileshare"
LOCATION="westus"
VELERO_SP_NAME="k8svelerobackup"
AKS_RESOURCE_GROUP="MC_k8s-resource-01_k8s-cluster-01_westus"


#Create a resource group for the backup storage account.
echo "Creating resource group..."
az account set --subscription $SUBSCRIPTION
az group create --location $LOCATION --name $VELERO_RESOURCE_GROUP_NAME

#Create the storage account.
echo "Creating storage account..."
az storage account create --name $VELERO_STORAGE_ACCOUNT_NAME --resource-group $VELERO_RESOURCE_GROUP_NAME --location $LOCATION --kind StorageV2 --sku Standard_GRS --encryption-services blob --https-only true --access-tier Hot

FILE_SHARE_STRING=$(az storage account show-connection-string -n $VELERO_STORAGE_ACCOUNT_NAME -g $VELERO_RESOURCE_GROUP_NAME --query 'connectionString' -o tsv)
az storage share create --name $VELERO_BLOB_FILESHARE_NAME --quota 5 --connection-string $FILE_SHARE_STRING

kubectl create namespace sysadminaspv

kubectl create secret generic azure-secret --from-literal=azurestorageaccountname=k8svelerobackup01 --from-literal=azurestorageaccountkey=05R/NwLd+uZmGu+kP/rzbPE1WHLgZ/jOzejlolL18Pa9N5bKF0PhYXnVkzWtFRHS9oQGfdsTP73XCEXxE26D1Q==  --namespace sysadminaspv

