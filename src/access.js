
function getFlags(authItem, item) {
  authItem['view_flag'] = item.view_flag
  authItem['modify_flag'] = item.modify_flag
  authItem['examine_flag'] = item.examine_flag
  // authItem['review_flag'] = item.review_flag
}


export default (initialState) => {
  let menus = []
  initialState && initialState.menuList.forEach(item => {
    let authItem = {
      code: item.menu_code,
      name: item.menu_name,
    }
    getFlags(authItem, item);
    menus.push(authItem);
    if (item.menu_list.length > 0) {
      item.menu_list.forEach(subItem => {
        let sbuAuthItem = {
          code: subItem.sub_menu_code,
          name: subItem.sub_menu_name,
        }
        getFlags(sbuAuthItem, subItem);
        menus.push(sbuAuthItem);
      })
    }
  });

  const menuName = menus.map((item) => item.name)

  const AccessMap = {
    displayUser: menuName.indexOf("用户管理") !== -1,
    displayRole: menuName.indexOf("角色管理") !== -1,
    displayAccount: menuName.indexOf("账号管理") !== -1,
    displayLog: menuName.indexOf("操作日志") !== -1,
    displayProduct: menuName.indexOf("产品管理") !== -1,
    displayWhiteList: menuName.indexOf("白名单管理") !== -1,
    displayInsuranceCompany: menuName.indexOf("保险公司") !== -1,
    displayAffiatedCompany: menuName.indexOf("挂靠公司") !== -1,
    displayAffiatedDriver: menuName.indexOf("挂靠司机") !== -1,
    displayInsured: menuName.indexOf("投保人") !== -1,

    displayChannel: menuName.indexOf("渠道管理") !== -1,
    displayChanelGroup: menuName.indexOf("渠道团队") !== -1,
    displayChannelMember: menuName.indexOf("团队成员") !== -1,

    displayCustomer: menuName.indexOf("客户管理") !== -1,
    displayCustomerInfo: menuName.indexOf("客户信息") !== -1,
    displayCustomerCredit: menuName.indexOf("客户授信") !== -1,
    displayCustomerProduct: menuName.indexOf("客户产品") !== -1,
    displayInsureOrder: menuName.indexOf("保单管理") !== -1,

    displayQuata: menuName.indexOf("额度管理") !== -1,

    displayWin: menuName.indexOf("中标管理") !== -1,

    displayOrder: menuName.indexOf("订单管理") !== -1,

    displayLoan: menuName.indexOf("保费分期") !== -1,
    displayInsureTicketOrder: menuName.indexOf("投保单管理") !== -1,
    displayCustomerOrder: menuName.indexOf("客户订单") !== -1,
    displayCustomerLoan: menuName.indexOf("客户贷款") !== -1,

    displayLoanFapiao: menuName.indexOf("发票贷") !== -1,

    //displayPolicy: menuName.indexOf("保单管理") !== -1,

    displayCorrect: menuName.indexOf("批改管理") !== -1,

    displayReportForm: menuName.indexOf("报表管理") !== -1,

    displayMyApprove: menuName.indexOf("我的审批") !== -1,
  };

  menus.forEach(item => {
    AccessMap[item.code] = {
      name: item.name,
      view_flag: item.view_flag,
      // 编辑
      modify_flag: item.modify_flag,
      // 审核
      examine_flag: item.examine_flag,
      // 复核 废掉
      // review_flag: item.review_flag,
    }
  });
  return AccessMap
};


