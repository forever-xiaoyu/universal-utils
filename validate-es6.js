// 中文名
export function validateName(name) {
  let res = {
    data: true
  }
  // 如果前后含有空格或者中间含有连续空格
  if (name.indexOf('  ') != -1 || name.indexOf(' ') == 0 || name.substr(name.length - 1, 1) == ' ') {
    res.data = false;
    res.msg = '姓名输入格式有误'
    return res;
  }
  // 如果前后含有·或者中间含有连续·
  if (name.indexOf('··') != -1 || name.indexOf('·') == 0 || name.substr(name.length - 1, 1) == '·') {
    res.data = false;
    res.msg = '姓名输入格式有误'
    return res;
  }
  // 20个汉字 或者 20个字母
  let reg = /^([\u4e00-\u9fa5\·]{2,20}|[a-zA-Z\s]{2,20})$/;
  if (!reg.test(name)) {
    res.data = false;
    res.msg = '姓名输入格式有误'
  }
  return res;
}

// 验证是数字
export function validateOnlyNumber(value) {
  return value.replace(/[^0-9]/g, "");
}

// 验证是身份证
export function validateOnlyIdcard(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return "";
  }
  return value.replace(/[^0-9|x|X]/g, "");
}

export function validateHKMacaoIdcard(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return "";
  }
  return value.replace(/[^\*a-zA-Z0-9]/g, "");
}

export function validateTaiwanIdcard(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return "";
  }
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

export function validatePassportIdcard(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return "";
  }
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

// 警官证
export function validatePliceOfficerIdcard(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return "";
  }
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

// 军官证
export function validateMilitaryOfficerIdcard(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return value.replace(/\s+/g, "");
  }
  return value.replace(/[^\u4e00-\u9fa5\A-Za-z0-9]/g, ''); // 去除所有特殊符号
}

// 其他证件  替换空格
export function validateOtherTypeIdcard(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return value.replace(/\s+/g, "");
  }
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

export function validateOnlychartAndNumber(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return "";
  }
  return value.replace(/[^A-Z|a-z|0-9]/g, "");
}

// 验证是数字
export function validateReplaceSpace(value) {
  if (!/^\S+$/.test(value)) {
    // 空的判断
    return "";
  }
  return value.replace(/ /g, "");
}

// 星号 手机号
export function validateMaskPhone(phone) {
  let res = {
    data: true
  };

  let re = /^\d{3}\*{4}\d{4}$/;
  // let re = new RegExp(regu);
  if (!re.test(phone)) {
    res.data = false;
    res.msg = '中间不是四个星号';
  }

  return res;
}

// 手机号
export function validatePhone(phone) {
  let res = {
    data: true
  };

  if (phone == '') {
    res.data = false;
    res.msg = "手机号码不能为空";
    return res;
  }

  let re = /^1[23456789]\d{9}$/;
  if (!re.test(phone)) {
    res.data = false;
    res.msg = "请输入正确的手机号码";
  }

  return res;
}

// 身份证号
export function validateMaskIdCardNum(idCardNum) {
  let res = {
    data: true
  };

  let re = /^\d{3}\*{11}\d{4}$/;
  // let re = new RegExp(regu);
  if (!re.test(idCardNum)) {
    res.data = false;
    res.msg = "中间不是11个星号";
  }

  return res;
}

// 身份证
export function validateIdCardNum(idCardNum) {
  let res = {
    data: true
  };

  let regBox = {
    regIdCard: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
  };
  if (regBox.regIdCard.test(idCardNum)) {
    if (idCardNum.length == 18) {
      let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (let i = 0; i < 17; i++) {
        idCardWiSum += idCardNum.substring(i, i + 1) * idCardWi[i];
      }
      let idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      let idCardLast = idCardNum.substring(17); //得到最后一位身份证号码

      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast != "X" && idCardLast != "x") {
          res.data = false;
          // res.msg = '身份证号码最后一位应该是x|X';
          res.msg = '身份证校验位错误请重新输入';
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast != idCardY[idCardMod]) {
          res.data = false;
          // res.msg = '无效身份证号码';
          res.msg = '身份证信息错误请重新输入';
        }
      }

      // 验证身份证中的生日
      let f = validateBirthday(idCardNum);
      if (!f.data) {
        res.data = false;
        res.msg = f.msg;
      }
    } else {
      res.data = false;
      res.msg = '请填写正确的18位身份证'
    }
  } else {
    res.data = false;
    res.msg = "请填写正确的18位身份证"
  }

  return res;
}

// 港澳通行证，台胞证，护照
export function validateOtherIdCard(idCardNum, type) {
  let res = {
    data: true
  };

  let regBox = {
    /* 2018-11-13
      港澳通行证改名“港澳身份证”，允许字母、数字、“*”号输入（*或***）
      台胞证校验规则：首位要求字母，后跟9位数字，例如“A123456789”
      护照校验规则：允许字母、数字输入（体检业务中“其他证件”校验规则与护照保持一致）
    */
    // isHKMacao: /^(\*{1}|\*{3})[a-zA-Z0-9]+$/,
    isHKMacao: /^([A-Za-z\d]|[\*]{1}|[\*]{3})[A-Za-z\d]/,
    isTaiwan: /^[a-zA-Z][0-9]{9}$/,
    onlyChartAndNumber: /[A-Za-z0-9]/
  };
  // if(!regBox.onlyChartAndNumber.test(idCardNum)){
  //   res.data = false;
  //   res.msg = "请填写正确的证件号!"
  // }

  if (type == 2) {
    if (!regBox.isHKMacao.test(idCardNum)) {
      res.data = false;
      res.msg = "请输入正确的证件号码"
    }
  }
  if (type == 3) {
    if (!regBox.isTaiwan.test(idCardNum)) {
      res.data = false;
      res.msg = "请输入正确的证件号码"
    }
  }
  if (type == 4) {
    if (!regBox.onlyChartAndNumber.test(idCardNum)) {
      res.data = false;
      res.msg = "请输入正确的证件号码"
    }
  }
  return res;
}

// 验证18位数身份证号码中的生日是否是有效生日
// 18位书身份证字符串
export function validateBirthday(idCardNum) {
  let res = {
    data: true
  }

  let year = idCardNum.substring(6, 10);
  let month = idCardNum.substring(10, 12);
  let day = idCardNum.substring(12, 14);

  let temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));

  // 这里用getFullYear()获取年份，避免千年虫问题
  if (temp_date.getFullYear() != parseFloat(year) ||
    temp_date.getMonth() != parseFloat(month) - 1 ||
    temp_date.getDate() != parseFloat(day)) {
    res.data = false;
    res.msg = '出生年月日格式不正确';
  } else {
    res.msg = year + '-' + month + '-' + day;
  }

  return res;
}

// 校验身份证号性别 1:男    2:女
export function validateIdCardSex(idCard) {
  if (idCard.length == 15) {
    if (idCard.substring(14, 15) % 2 == 0) {
      return 2;
    } else {
      return 1;
    }
  } else if (idCard.length == 18) {
    if (idCard.substring(14, 17) % 2 == 0) {
      return 2;
    } else {
      return 1;
    }
  } else {
    //不是15或者18,null
    return null;
  }
}

// 公司名 发票
export function validateCompanyName(companyName) {
  let res = {
    data: true,
  }

  let pattern = new RegExp("[^\u4E00-\u9FA5^a-z^A-Z^0-9^?!.。,()（）]");

  if (companyName.length == 0) {
    res.data = false;
    res.msg = "请输入单位名称";
  }

  if (companyName.length > 50) {
    res.data = false;
    res.msg = "单位名称过长，请重新输入";
  }

  if (pattern.test(companyName)) {
    res.data = false;
    res.msg = "请输入正确的单位名称";
  }

  return res;
}

export function validateInvoiceNum(InvoiceNum) {
  let res = {
    data: true,
  }

  let pattern = /[a-zA-Z0-9]/;

  if (InvoiceNum.length == 0) {
    res.data = false;
    res.msg = "请输入纳税人识别号";
  }
  if (InvoiceNum.length < 15) {
    res.data = false;
    res.msg = "请输入完整的纳税人识别号";
  }
  if (InvoiceNum.length >= 15) {
    if (!pattern.test(InvoiceNum)) {
      res.data = false;
      res.msg = "请输入正确的纳税人识别号";
    }
  }

  return res;
}

// 邮箱验证
export function validateEmail(email) {
  let res = {
    data: true
  }

  let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  if (!re.test(email)) {
    res.data = false;
    res.msg = "请正确填写邮箱地址"
  }

  return res;
}
