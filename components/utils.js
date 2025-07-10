const data = { 0 : '⏳ Pending', 1 : '✔️ Approve', 2 : '❌ Reject'}
const withoutIcn = { 0 : 'Pending', 1 : 'Approve', 2 : 'Reject'}

export const getName = (val) => { return data[val] }
export const getNameWithoutIcn = (val) => { return withoutIcn[val] }