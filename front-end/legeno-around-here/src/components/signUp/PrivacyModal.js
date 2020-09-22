import React from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { getModalStyle, useStyles } from './TermsModal';

const content =
  "('https://www.capzzang.co.kr/'이하 '우리동네캡짱')은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.\n" +
  '\n' +
  "('우리동네캡짱') 은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.\n" +
  '\n' +
  '○ 본 방침은부터 2020년 9월 22일부터 시행됩니다.\n' +
  '\n' +
  '\n' +
  "1. 개인정보의 처리 목적 ('https://www.capzzang.co.kr/'이하 '우리동네캡짱')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.\n" +
  '\n' +
  '가. 홈페이지 회원가입 및 관리\n' +
  '\n' +
  '회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 각종 고지·통지, 고충처리, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 처리합니다.\n' +
  '\n' +
  '\n' +
  '나. 재화 또는 서비스 제공\n' +
  '\n' +
  '본인인증 등을 목적으로 개인정보를 처리합니다.\n' +
  '\n' +
  '\n' +
  '다. 마케팅 및 광고에의 활용\n' +
  '\n' +
  '접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.\n' +
  '\n' +
  '\n' +
  '2. 개인정보 파일 현황\n' +
  '\n' +
  '\n' +
  '\n' +
  '3. 개인정보의 처리 및 보유 기간\n' +
  '\n' +
  "① ('우리동네캡짱')은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유,이용기간 내에서 개인정보를 처리,보유합니다.\n" +
  '\n' +
  '② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.\n' +
  '\n' +
  '1.<홈페이지 회원가입 및 관리>\n' +
  '<홈페이지 회원가입 및 관리>와 관련한 개인정보는 수집.이용에 관한 동의일로부터<3년>까지 위 이용목적을 위하여 보유.이용됩니다.\n' +
  '보유근거 : 전자상거래 등에서의 소비자보호에 관한 법률 시행령\n' +
  '관련법령 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년\n' +
  '예외사유 : 없음\n' +
  '\n' +
  '\n' +
  '4. 개인정보의 제3자 제공에 관한 사항\n' +
  '\n' +
  "① ('https://www.capzzang.co.kr/'이하 '우리동네캡짱')은(는) 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.\n" +
  '\n' +
  "② ('https://www.capzzang.co.kr/')은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.\n" +
  '\n' +
  '\n' +
  '\n' +
  '5. 개인정보처리 위탁\n' +
  '\n' +
  "① ('우리동네캡짱')은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.\n" +
  '\n' +
  "② ('https://www.capzzang.co.kr/'이하 '우리동네캡짱')은(는) 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.\n" +
  '\n' +
  '③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.\n' +
  '\n' +
  '6. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.\n' +
  '\n' +
  '① 정보주체는 ITTABI에 대해 언제든지 개인정보 열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다.\n' +
  '\n' +
  '② 제1항에 따른 권리 행사는ITTABI에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 ITTABI은(는) 이에 대해 지체 없이 조치하겠습니다.\n' +
  '\n' +
  '③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.\n' +
  '\n' +
  '④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.\n' +
  '\n' +
  '⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.\n' +
  '\n' +
  '⑥ ITTABI은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.\n' +
  '\n' +
  '\n' +
  '\n' +
  '7. 처리하는 개인정보의 항목 작성\n' +
  '\n' +
  "① ('https://www.capzzang.co.kr/'이하 '우리동네캡짱')은(는) 다음의 개인정보 항목을 처리하고 있습니다.\n" +
  '\n' +
  '1<홈페이지 회원가입 및 관리>\n' +
  '필수항목 : 이메일, 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제기록\n' +
  '- 선택항목 :\n' +
  '\n' +
  '\n' +
  "8. 개인정보의 파기('우리동네캡짱')은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.\n" +
  '\n' +
  '-파기절차\n' +
  '이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.\n' +
  '\n' +
  '-파기기한\n' +
  '이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.\n' +
  '\n' +
  '-파기방법\n' +
  '\n' +
  '전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다\n' +
  '\n' +
  '\n' +
  '\n' +
  '9. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항\n' +
  '\n' +
  '① ITTABI 은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다. 나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.\n' +
  '\n' +
  '10. 개인정보 보호책임자 작성\n' +
  '\n' +
  '① ITTABI(‘https://www.capzzang.co.kr/’이하 ‘우리동네캡짱) 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n' +
  '\n' +
  '▶ 개인정보 보호책임자\n' +
  '성명 :이따비\n' +
  '직책 :개인정보 보호책임팀\n' +
  '직급 :팀\n' +
  '연락처 :capzzang.join@gmail.com' +
  '※ 개인정보 보호 담당부서로 연결됩니다.\n' +
  '\n' +
  '▶ 개인정보 보호 담당부서\n' +
  '부서명 :이따비\n' +
  '담당자 :이따비\n' +
  '연락처 :capzzang.join@gmail.com\n' +
  '② 정보주체께서는 ITTABI(‘https://www.capzzang.co.kr/’이하 ‘우리동네캡짱) 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. ITTABI(‘https://www.capzzang.co.kr/’이하 ‘우리동네캡짱) 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.\n' +
  '\n' +
  '11. 개인정보 처리방침 변경\n' +
  '\n' +
  '①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.\n' +
  '\n' +
  '\n' +
  '\n' +
  "12. 개인정보의 안전성 확보 조치 ('우리동네캡짱')은(는) 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.\n" +
  '\n' +
  '1. 접속기록의 보관 및 위변조 방지\n' +
  '개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.';

const PrivacyModal = ({ open, closeModal, agree, setAgree }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const onChangeAgree = (event) => {
    event.preventDefault();
    const turnedAgree = !agree;
    setAgree(turnedAgree);
    if (turnedAgree) {
      closeModal();
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>우리동네캡짱 개인정보 수집 및 이용 안내</h2>
          <TextField
            id='outlined-multiline-static'
            label='Multiline'
            multiline
            rows={10}
            defaultValue={content}
            variant='outlined'
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <Checkbox
            color='primary'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            checked={agree}
            onChange={onChangeAgree}
          />
          개인정보 수집 및 이용에 동의합니다.(필수)
        </div>
      </Modal>
    </>
  );
};

export default PrivacyModal;
