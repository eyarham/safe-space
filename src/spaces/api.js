import api from "../_common/api";
const { createDoc, getDocsSub } = api("spaces");


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

export { create, getDocsSub, getApprovedDocsSub };

