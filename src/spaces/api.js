import api from "../_common/api";
const { createDoc, getDocsSub, getByIdSub, updateDoc,updateField } = api("spaces");


const create = async (data) => {
  const newSpace = {
    ...data
  };
  await createDoc(newSpace);
}


const getApprovedDocsSub = (callback) => {
  return getDocsSub(docs => {
    const approvedDocs = docs.filter(d => d.data().isApproved === true);

    return callback(approvedDocs);
  })
}

const setIsApproved =async (id,isApproved)=>{
  await updateField(id,{isApproved});
}

export { create, getDocsSub, getApprovedDocsSub, getByIdSub, updateDoc,setIsApproved };

