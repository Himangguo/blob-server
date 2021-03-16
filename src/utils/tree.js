// 将具有parentId的扁平化数据变为树形结构
const tfArrToTree = (list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId) {
      let target = dfs(list, list[i].parentId);
      target.children
        ? target.children.push(list[i])
        : (target.children = [list[i]]);
      list.splice(i--, 1);
    }
  }
  return list;
};
function dfs(list, id) {
  let target = null;
  if (!list) {
    return null;
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      return list[i];
    }
    if ((target = dfs(list[i].children, id))) {
      return target;
    }
  }
  return null;
}
module.exports = {
  tfArrToTree,
};
