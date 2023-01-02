import api from "../_common/api";
const { createDoc, getDocsSub, getByIdSub, updateDoc, updateField } = api("spaces");


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

const setIsApproved = async (id, isApproved) => {
  await updateField(id, { isApproved });
}
const setIsReviewed = async (id, isReviewed) => {
  await updateField(id, { isReviewed });
}

const hasUnreviewedSub = (callback) => {
  return getDocsSub(docs => {
    const unreviewedDocs = docs.filter(d => d.data().isReviewed !== true);
    const hasUnreviewed = unreviewedDocs.length > 0;
    return callback(hasUnreviewed);
  })
}

export { create, getDocsSub, getApprovedDocsSub, getByIdSub, updateDoc, setIsApproved, setIsReviewed, hasUnreviewedSub };

