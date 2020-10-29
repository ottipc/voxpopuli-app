const Icon = ({ name }) => {
  const iconsList = {
    heart: '&#xe800;',
    star: '&#xe801;',
    like: '&#xe80b;',
    icon_like: '&#xe106;',
    dislike: '&#xe802;',
    flash: '&#xe803;',
    marker: '&#xf031;',
    filter: '&#xf0b0;',
    user: '&#xf061;',
    circle: '&#xf039;',
    hashtag: '&#xf029;',
    calendar: '&#xf4c5;',
    chevronLeft: '&#xf004;',
    optionsV: '&#xf142;',
    optionsH: '&#xf141;',
    chat: '&#xf4ac;',
    explore: '&#xf50d;',
    vote: '&#xf50d;',
    register: '&#xf039;'

  };

  let icon = iconsList[name];
  icon = icon.substr(3);
  icon = String.fromCharCode(parseInt(icon, 16));

  return icon;
};

export default Icon;
