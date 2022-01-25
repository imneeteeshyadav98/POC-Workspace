SUBSCRIPTION="307229a7-f578-4e4c-b96e-522183580ae3"
VELERO_RESOURCE_GROUP_NAME="k8s-resource-01"
VELERO_STORAGE_ACCOUNT_NAME="k8svelerobackup01" 
VELERO_BLOB_CONTAINER_NAME="k8svelerobackup"
LOCATION="westus"
VELERO_SP_NAME="k8svelerobackup"
AKS_RESOURCE_GROUP="MC_k8s-resource-01_k8s-cluster-01_westus"
IDENTITY_NAME="k8svelero"


az identity create --subscription $SUBSCRIPTION --resource-group $VELERO_RESOURCE_GROUP_NAME --name $IDENTITY_NAME