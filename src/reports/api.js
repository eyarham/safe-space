import api from "../_common/api";
const { createDoc, getDocsSub } = api("reports");


const hasUnreviewedSub = (callback) => {
  return getDocsSub(docs => {
    const unreviewedDocs = docs.filter(d => d.data().isReviewed !== true);
    const hasUnreviewed = unreviewedDocs.length > 0;
    return callback(hasUnreviewed);
  })
}
export { createDoc, getDocsSub,hasUnreviewedSub }