import { useState, useRef } from "react";

const QUESTIONS = [
  { id:1, type:"short", topic:"라우팅", question:"Distance Vector 방식, 최대 홉 15개, 업데이트 주기 30초인 라우팅 프로토콜은?", answer:["RIP"], hint:"홉 수 기준 라우팅, 업데이트 30초" },
  { id:2, type:"short", topic:"라우팅", question:"Link State 방식, 라우터 자신을 중심으로 최단 경로를 계산하는 라우팅 프로토콜은?", answer:["OSPF"], hint:"다익스트라 알고리즘 사용" },
  { id:3, type:"short", topic:"보안", question:"인터넷망(공중망)에서 가상 터널을 만들어 안전하게 데이터를 전송하는 네트워크 기술은?", answer:["VPN"], hint:"L2TP, PPTP, IPSec 프로토콜 사용" },
  { id:4, type:"short", topic:"보안", question:"HTTP 트래픽을 필터링·모니터링·차단하는 애플리케이션 방화벽은?", answer:["WAF","웹방화벽"], hint:"Web Application Firewall" },
  { id:5, type:"short", topic:"보안", question:"IP 패킷 인증+암호화+무결성+기밀성을 모두 보장하는 IPSec 헤더는?", answer:["ESP"], hint:"Encapsulating Security Payload" },
  { id:6, type:"short", topic:"보안", question:"IP 패킷 인증과 무결성만 보장하는 IPSec 헤더는? (암호화 없음)", answer:["AH"], hint:"Authentication Header" },
  { id:7, type:"short", topic:"보안", question:"IPSec에서 암호화 및 인증에 사용할 요소를 정의하는 협약은?", answer:["SA"], hint:"Security Association" },
  { id:8, type:"short", topic:"보안", question:"전용회선처럼 사용 가능한 가상 전용회선을 만들며 AH와 ESP 2개 프로토콜로 구성된 통신규약은?", answer:["IPSec"], hint:"IP Security" },
  { id:9, type:"short", topic:"네트워크", question:"사설 IP를 공인 IP로 변환하는 기술은?", answer:["NAT"], hint:"Network Address Translation" },
  { id:10, type:"short", topic:"네트워크", question:"네트워크 장치에 IP 주소를 자동으로 할당하는 프로토콜은?", answer:["DHCP"], hint:"Dynamic Host Configuration Protocol" },
  { id:11, type:"short", topic:"네트워크", question:"스위칭 LAN 기반으로 논리적 네트워크를 구성하는 가상 LAN 기술은?", answer:["VLAN"], hint:"Virtual LAN, 지리적 제한 최소화" },
  { id:12, type:"short", topic:"네트워크", question:"VTP에서 V가 의미하는 것은?", answer:["VLAN"], hint:"VLAN Trunking Protocol" },
  { id:13, type:"short", topic:"네트워크", question:"인터넷 그룹 관리 프로토콜. 멀티캐스트 그룹을 인근 라우터에게 알리는 프로토콜은?", answer:["IGMP"], hint:"Internet Group Management Protocol" },
  { id:14, type:"short", topic:"보안", question:"브라우저 간 전송 데이터를 암호화하여 인터넷 연결을 보호하는 기술은?", answer:["SSL"], hint:"Secure Sockets Layer" },
  { id:15, type:"short", topic:"보안", question:"SSL/TLS 인증서로 보호되는 HTTP 통신 프로토콜은?", answer:["HTTPS"], hint:"HTTP + SSL" },
  { id:16, type:"short", topic:"보안", question:"암호화된 원격 로그인 프로토콜로 Telnet보다 보안성이 높은 프로토콜은?", answer:["SSH"], hint:"Secure Shell" },
  { id:17, type:"short", topic:"RAID", question:"미러링 모드라고도 하며, 데이터를 동시에 다른 디스크에 백업해 1개 손상돼도 복구 가능한 RAID는?", answer:["RAID 1","RAID1"], hint:"스트라이핑=RAID 0, 미러링=RAID 1" },
  { id:18, type:"short", topic:"리눅스", question:"현재 디렉토리의 경로를 출력하는 리눅스 명령어는?", answer:["pwd"], hint:"Print Working Directory" },
  { id:19, type:"short", topic:"리눅스", question:"CPU 사용량, 프로세스 우선순위 등을 실시간 모니터링하는 리눅스 명령어는?", answer:["top"], hint:"가장 우선순위 높은 프로세스 확인 가능" },
  { id:20, type:"short", topic:"리눅스", question:"라우팅 테이블, 네트워크 인터페이스, 연결 정보를 보여주는 리눅스 명령어는?", answer:["netstat"], hint:"network statistics" },
  { id:21, type:"short", topic:"리눅스", question:"목적지 서버까지의 네트워크 경로를 추적하는 리눅스 명령어는?", answer:["traceroute"], hint:"리눅스=traceroute(UDP), 윈도우=tracert(ICMP)" },
  { id:22, type:"short", topic:"리눅스", question:"패스워드를 설정하거나 변경하는 리눅스 명령어는?", answer:["passwd"], hint:"password 명령어" },
  { id:23, type:"short", topic:"리눅스", question:"명령어의 매뉴얼(도움말, 옵션 등)을 출력하는 리눅스 명령어는?", answer:["man"], hint:"manual" },
  { id:24, type:"short", topic:"리눅스", question:"외부 ping을 허용하려면 icmp_echo_ignore_all 값을 얼마로 설정해야 하는가?", answer:["0"], hint:"0=허용, 1=차단" },
  { id:25, type:"short", topic:"리눅스", question:"GNU하에 개발된 리눅스 부트로더는?", answer:["grub","GRUB"], hint:"Grand Unified Bootloader" },
  { id:26, type:"short", topic:"리눅스", question:"리눅스 커널 부팅 후 실행되는 첫 번째 프로세스는?", answer:["init"], hint:"PID 1, 커널이 직접 실행하는 유일한 프로세스" },
  { id:27, type:"short", topic:"리눅스", question:"부팅 시 자동으로 마운트되도록 설정하는 파일 경로는?", answer:["/etc/fstab"], hint:"file system table" },
  { id:28, type:"short", topic:"리눅스", question:"시스템을 종료하는 init 옵션 번호는?", answer:["0"], hint:"init 0=종료, init 6=재시작" },
  { id:29, type:"short", topic:"네트워크", question:"OSI 7계층 중 암호화, 복호화, 압축, 코드 변환을 담당하는 계층은?", answer:["표현 계층","표현계층","Presentation"], hint:"6계층" },
  { id:30, type:"multi", topic:"IPv6", question:"IPv6의 특징으로 올바른 것을 모두 고르시오.", options:["주소 크기가 32비트이다","주소 크기가 128비트이다","8비트씩 4부분 10진수로 표현한다","애니캐스트를 지원한다","브로드캐스트를 지원한다","확장 헤더 옵션이 있다","헤더 크기가 고정이다","보안성이 향상되었다"], answer:[1,3,5,6,7], hint:"IPv6 = 128비트, 16진수 콜론 구분, 애니캐스트, 브로드캐스트 없음" },
  { id:31, type:"multi", topic:"UDP", question:"UDP에 관한 설명으로 옳은 것을 모두 고르시오.", options:["신뢰성이 높다","비연결형 방식으로 전송한다","오류를 감지하고 수정한다","TCP보다 전송속도가 빠르다","흐름제어를 지원한다","혼잡제어를 지원하지 않는다"], answer:[1,3,5], hint:"UDP = 비연결형, 빠름, 흐름/혼잡/오류 제어 없음" },
  { id:32, type:"multi", topic:"TCP", question:"TCP의 특징으로 올바른 것을 모두 고르시오.", options:["연결형 방식이다","비연결형 방식이다","신뢰성이 높다","송신과 수신이 동일하다","흐름제어를 지원한다","UDP보다 전송속도가 빠르다"], answer:[0,2,3,4], hint:"TCP = 연결형, 신뢰성, 흐름/혼잡/오류 제어, ACK 사용" },
  { id:33, type:"multi", topic:"TCP/IP 계층", question:"TCP/IP 4계층에서 인터넷 계층 프로토콜을 모두 고르시오.", options:["ARP","SMTP","TCP","IGMP","ICMP","HTTP","UDP"], answer:[0,3,4], hint:"인터넷 계층: IP, ARP, RARP, ICMP, IGMP" },
  { id:34, type:"multi", topic:"TCP/IP 계층", question:"TCP/IP 4계층에서 전송 계층 프로토콜을 모두 고르시오.", options:["ARP","ICMP","TCP","UDP","HTTP","IGMP"], answer:[2,3], hint:"전송 계층: TCP, UDP" },
  { id:35, type:"match", topic:"ICMP", question:"ICMP 타입 번호와 메시지를 올바르게 연결하시오.", pairs:[{left:"Type 0",right:"Echo Reply (에코 응답)"},{left:"Type 3",right:"Destination Unreachable (목적지 도달 불가)"},{left:"Type 4",right:"Source Quench (발신 제한)"},{left:"Type 5",right:"Redirect (라우트 변경)"},{left:"Type 8",right:"Echo Request (에코 요구)"},{left:"Type 11",right:"Time Exceeded (시간 초과)"}], hint:"0=응답, 3=불가, 4=발신제한, 5=경로변경, 8=요구, 11=시간초과" },
  { id:36, type:"match", topic:"네트워크 서비스", question:"각 설명에 맞는 용어를 올바르게 연결하시오.", pairs:[{left:"사설 IP를 공인 IP로 변환하는 서비스",right:"NAT"},{left:"IP 주소를 자동으로 할당하는 프로토콜",right:"DHCP"},{left:"네트워크 트래픽을 모니터링·제어하는 보안 시스템",right:"Firewall"},{left:"공중망에서 가상 터널로 안전하게 연결하는 네트워크",right:"VPN"}], hint:"NAT=주소변환, DHCP=자동할당, Firewall=보안, VPN=가상터널" },
  { id:37, type:"match", topic:"IPSec", question:"IPSec 구성 요소와 설명을 올바르게 연결하시오.", pairs:[{left:"AH",right:"인증 + 무결성 (암호화 없음)"},{left:"ESP",right:"인증 + 암호화 + 무결성 (기밀성 포함)"},{left:"SA",right:"암호화/인증에 사용할 요소를 정의하는 협약"}], hint:"AH=인증만, ESP=인증+암호화, SA=협약" },
  { id:38, type:"match", topic:"메모리", question:"각 설명에 맞는 메모리 종류를 연결하시오.", pairs:[{left:"한 번 기록 후 반영구 보존, 삭제/수정 불가",right:"ROM"},{left:"임의 접근, 읽기/쓰기 가능한 주기억장치",right:"RAM"},{left:"전력소모 적음, 고속 프로그래밍, 대용량 저장",right:"FLASH"},{left:"화상 정보 저장 전용 메모리",right:"VRAM"}], hint:"ROM=읽기전용, RAM=주기억, FLASH=저장장치, VRAM=그래픽" },
  { id:39, type:"match", topic:"리눅스 시스템", question:"각 설명에 맞는 리눅스 시스템 구성 요소를 연결하시오.", pairs:[{left:"GNU하에 개발된 리눅스 부트로더",right:"GRUB"},{left:"커널 부팅 후 실행되는 첫 번째 프로세스",right:"init"},{left:"부팅 시 자동 마운트 설정 파일",right:"/etc/fstab"}], hint:"GRUB=부트로더, init=PID1, fstab=마운트설정" },
  { id:40, type:"match", topic:"사설 IP", question:"각 사설 IP 클래스와 범위를 올바르게 연결하시오.", pairs:[{left:"사설 A클래스",right:"10.0.0.0 ~ 10.255.255.255"},{left:"사설 B클래스",right:"172.16.0.0 ~ 172.31.255.255"},{left:"사설 C클래스",right:"192.168.0.0 ~ 192.168.255.255"}], hint:"A=10, B=172.16~31, C=192.168" },
];

const TC_MAP = {
  "라우팅":{bg:"#e8f4fd",border:"#3b9ede",text:"#1a5f8a"},
  "보안":{bg:"#fdecea",border:"#e05c4a",text:"#8b2a1e"},
  "네트워크":{bg:"#e9f7ef",border:"#3aab6b",text:"#1a6b3e"},
  "IPv6":{bg:"#f0ecfd",border:"#7c5cbf",text:"#40246e"},
  "UDP":{bg:"#fff8e1",border:"#f0a500",text:"#7a5000"},
  "TCP":{bg:"#fff8e1",border:"#f0a500",text:"#7a5000"},
  "TCP/IP 계층":{bg:"#fce4ec",border:"#d63b7a",text:"#7a0032"},
  "ICMP":{bg:"#e3f2fd",border:"#1976d2",text:"#0d47a1"},
  "IPSec":{bg:"#fdecea",border:"#e05c4a",text:"#8b2a1e"},
  "RAID":{bg:"#e8f5e9",border:"#43a047",text:"#1b5e20"},
  "리눅스":{bg:"#f3e5f5",border:"#8e24aa",text:"#4a148c"},
  "리눅스 시스템":{bg:"#f3e5f5",border:"#8e24aa",text:"#4a148c"},
  "메모리":{bg:"#e0f7fa",border:"#00838f",text:"#00363a"},
  "사설 IP":{bg:"#e9f7ef",border:"#3aab6b",text:"#1a6b3e"},
  "네트워크 서비스":{bg:"#e9f7ef",border:"#3aab6b",text:"#1a6b3e"},
};
const TC = t => TC_MAP[t]||{bg:"#f5f5f5",border:"#999",text:"#333"};
const TYPE_LABEL={short:"단답형",multi:"다중선택",match:"연결하기"};
const TYPE_CLR={short:"#1a5f8a",multi:"#7c5cbf",match:"#1a6b3e"};
const ALL_TOPICS=["전체",...Array.from(new Set(QUESTIONS.map(q=>q.topic)))];

function Btn({onClick,disabled,color,bg,full,small,children}){
  return(
    <button onClick={onClick} disabled={disabled} style={{
      flex:full?1:"none",
      padding:small?"8px 14px":"13px 18px",
      borderRadius:12,border:`2px solid ${disabled?"#e0e0e0":color}`,
      background:disabled?"#f5f5f5":bg,
      color:disabled?"#bbb":color,
      fontSize:small?13:15,fontWeight:700,
      cursor:disabled?"not-allowed":"pointer",
      minHeight:small?36:48,
      WebkitTapHighlightColor:"transparent",
      transition:"opacity .15s",
      fontFamily:"inherit",
    }}>{children}</button>
  );
}

const HINT_BOX={marginTop:10,padding:"11px 14px",background:"#fffde7",border:"1.5px solid #f0a500",borderRadius:10,fontSize:13,color:"#7a5000",lineHeight:1.5};

function ShortQ({q,onResult}){
  const[val,setVal]=useState("");
  const[done,setDone]=useState(false);
  const[ok,setOk]=useState(false);
  const[hint,setHint]=useState(false);
  const check=()=>{
    if(!val.trim()||done)return;
    const correct=q.answer.some(a=>a.toLowerCase()===val.trim().toLowerCase());
    setOk(correct);setDone(true);onResult(correct);
  };
  return(
    <div>
      <input
        type="text" value={val}
        onChange={e=>setVal(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&check()}
        disabled={done}
        placeholder="정답을 입력하세요"
        autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
        style={{
          width:"100%",padding:"14px 16px",fontSize:16,
          border:`2px solid ${done?(ok?"#3aab6b":"#e05c4a"):"#ddd"}`,
          borderRadius:12,outline:"none",boxSizing:"border-box",
          background:done?(ok?"#e9f7ef":"#fdecea"):"#fff",
          color:"#222",WebkitAppearance:"none",fontFamily:"inherit",
          WebkitTextSizeAdjust:"100%",
        }}
      />
      {!done&&(
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <Btn onClick={check} disabled={!val.trim()} color="#1a5f8a" bg="#e8f4fd" full>확인</Btn>
          <Btn onClick={()=>setHint(h=>!h)} color="#7a5000" bg="#fff8e1">{hint?"힌트 숨기기":"💡 힌트"}</Btn>
        </div>
      )}
      {hint&&!done&&<div style={HINT_BOX}>{q.hint}</div>}
      {done&&(
        <div style={{marginTop:12,padding:"12px 16px",borderRadius:12,
          background:ok?"#e9f7ef":"#fdecea",
          border:`1.5px solid ${ok?"#3aab6b":"#e05c4a"}`,
          fontSize:15,fontWeight:700,color:ok?"#1a6b3e":"#8b2a1e"}}>
          {ok?"✅ 정답!":`❌ 정답: ${q.answer[0]}`}
          {!ok&&<div style={{marginTop:6,fontSize:13,fontWeight:400,opacity:0.85}}>💡 {q.hint}</div>}
        </div>
      )}
    </div>
  );
}

function MultiQ({q,onResult}){
  const[sel,setSel]=useState([]);
  const[done,setDone]=useState(false);
  const[hint,setHint]=useState(false);
  const toggle=i=>{if(done)return;setSel(s=>s.includes(i)?s.filter(x=>x!==i):[...s,i]);};
  const check=()=>{
    const ok=JSON.stringify([...sel].sort((a,b)=>a-b))===JSON.stringify([...q.answer].sort((a,b)=>a-b));
    setDone(true);onResult(ok);
  };
  return(
    <div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {q.options.map((opt,i)=>{
          const isSel=sel.includes(i);
          const isAns=q.answer.includes(i);
          let bg="#f8f8f8",border="#e0e0e0",color="#333";
          if(done){
            if(isAns){bg="#e9f7ef";border="#3aab6b";color="#1a6b3e";}
            else if(isSel){bg="#fdecea";border="#e05c4a";color="#8b2a1e";}
          }else if(isSel){bg="#e8f4fd";border="#3b9ede";color="#1a5f8a";}
          return(
            <button key={i} onClick={()=>toggle(i)} style={{
              textAlign:"left",padding:"13px 14px",borderRadius:12,
              border:`2px solid ${border}`,background:bg,color,
              fontSize:14,cursor:done?"default":"pointer",
              display:"flex",alignItems:"center",gap:12,
              minHeight:52,WebkitTapHighlightColor:"transparent",
              transition:"background .15s,border .15s",fontFamily:"inherit",
            }}>
              <span style={{
                width:24,height:24,borderRadius:7,border:`2px solid ${border}`,
                background:(isSel||(done&&isAns))?border:"transparent",
                display:"flex",alignItems:"center",justifyContent:"center",
                flexShrink:0,fontSize:14,color:"#fff",fontWeight:800,
              }}>{(isSel||(done&&isAns))?"✓":""}</span>
              <span style={{lineHeight:1.4}}>{opt}</span>
            </button>
          );
        })}
      </div>
      {!done&&(
        <div style={{display:"flex",gap:8,marginTop:12}}>
          <Btn onClick={check} disabled={sel.length===0} color="#7c5cbf" bg="#f0ecfd" full>확인</Btn>
          <Btn onClick={()=>setHint(h=>!h)} color="#7a5000" bg="#fff8e1">{hint?"힌트 숨기기":"💡 힌트"}</Btn>
        </div>
      )}
      {hint&&!done&&<div style={HINT_BOX}>{q.hint}</div>}
      {done&&(
        <div style={{marginTop:12,padding:"12px 14px",borderRadius:12,
          background:"#f0ecfd",border:"1.5px solid #7c5cbf",fontSize:13,color:"#40246e"}}>
          ✅ 정답: {q.answer.map(i=>q.options[i]).join(", ")}
          <div style={{marginTop:4,opacity:0.8}}>💡 {q.hint}</div>
        </div>
      )}
    </div>
  );
}

function MatchQ({q,onResult}){
  const[shuffledR]=useState(()=>[...q.pairs.map(p=>p.right)].sort(()=>Math.random()-.5));
  const[mapping,setMapping]=useState({});
  const[selRight,setSelRight]=useState(null);
  const[selLeft,setSelLeft]=useState(null);
  const[done,setDone]=useState(false);
  const[correct,setCorrect]=useState(false);

  const usedR=Object.values(mapping);

  const handleLeft=idx=>{
    if(done)return;
    if(selRight!==null){
      setMapping(m=>{
        const n={...m};
        Object.keys(n).forEach(k=>{if(n[k]===selRight)delete n[k];});
        n[idx]=selRight;return n;
      });
      setSelRight(null);setSelLeft(null);
    }else{
      if(mapping[idx]!==undefined){
        setMapping(m=>{const n={...m};delete n[idx];return n;});
      }else{
        setSelLeft(idx===selLeft?null:idx);
      }
    }
  };

  const handleRight=val=>{
    if(done)return;
    if(selLeft!==null){
      setMapping(m=>{
        const n={...m};
        Object.keys(n).forEach(k=>{if(n[k]===val)delete n[k];});
        n[selLeft]=val;return n;
      });
      setSelLeft(null);setSelRight(null);
    }else{
      if(usedR.includes(val)){
        setMapping(m=>{const n={...m};Object.keys(n).forEach(k=>{if(n[k]===val)delete n[k];});return n;});
      }else{
        setSelRight(val===selRight?null:val);
      }
    }
  };

  const check=()=>{
    const ok=q.pairs.every((p,i)=>mapping[i]===p.right);
    setCorrect(ok);setDone(true);onResult(ok);
  };

  const allMapped=q.pairs.every((_,i)=>mapping[i]!==undefined);

  return(
    <div>
      <div style={{
        fontSize:12,color:"#888",marginBottom:12,padding:"8px 12px",
        background:"#f8f8f8",borderRadius:8,lineHeight:1.5,textAlign:"center"
      }}>
        왼쪽 탭 → 오른쪽 탭 순서로 연결<br/>
        <span style={{color:"#bbb"}}>연결된 항목을 다시 탭하면 해제됩니다</span>
      </div>

      {/* 선택 상태 안내 */}
      {(selLeft!==null||selRight!==null)&&(
        <div style={{marginBottom:10,padding:"8px 12px",background:"#e8f4fd",borderRadius:8,fontSize:13,color:"#1a5f8a",fontWeight:600}}>
          {selLeft!==null&&`"${q.pairs[selLeft].left}" 선택됨 → 오른쪽을 탭하세요`}
          {selRight!==null&&`"${selRight}" 선택됨 → 왼쪽을 탭하세요`}
        </div>
      )}

      <div style={{display:"flex",gap:8}}>
        {/* 왼쪽 */}
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:7}}>
          <div style={{fontSize:11,fontWeight:700,color:"#aaa",marginBottom:2,textAlign:"center"}}>문제</div>
          {q.pairs.map((p,i)=>{
            const mapped=mapping[i];
            const isSelL=selLeft===i;
            const ok=done&&mapped===p.right;
            const ng=done&&mapped&&mapped!==p.right;
            let bg="#f8f8f8",border="#e0e0e0",color="#333";
            if(isSelL){bg="#dbeafe";border="#3b9ede";color="#1a5f8a";}
            else if(mapped){bg="#ede7f6";border="#9c7dca";color="#40246e";}
            if(ok){bg="#e9f7ef";border="#3aab6b";color="#1a6b3e";}
            if(ng){bg="#fdecea";border="#e05c4a";color="#8b2a1e";}
            return(
              <button key={i} onClick={()=>handleLeft(i)} style={{
                textAlign:"left",padding:"11px 10px",borderRadius:10,
                border:`2px solid ${border}`,background:bg,color,
                fontSize:12,cursor:done?"default":"pointer",
                minHeight:52,display:"flex",flexDirection:"column",
                justifyContent:"center",gap:3,
                WebkitTapHighlightColor:"transparent",
                transition:"background .15s",fontFamily:"inherit",
              }}>
                <span style={{lineHeight:1.4,fontWeight:600}}>{p.left}</span>
                {mapped&&(
                  <span style={{fontSize:10,opacity:0.7,fontWeight:400}}>
                    → {mapped.length>10?mapped.slice(0,10)+"…":mapped}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 오른쪽 */}
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:7}}>
          <div style={{fontSize:11,fontWeight:700,color:"#aaa",marginBottom:2,textAlign:"center"}}>정답</div>
          {shuffledR.map((r,i)=>{
            const isUsed=usedR.includes(r);
            const isSelR=selRight===r;
            let bg="#fff",border="#e0e0e0",color="#333";
            if(isSelR){bg="#dbeafe";border="#3b9ede";color="#1a5f8a";}
            if(isUsed&&!isSelR){bg="#f0f0f0";border="#ddd";color:"#aaa";}
            if(done){
              const lIdx=Object.keys(mapping).find(k=>mapping[k]===r);
              if(lIdx!==undefined){
                if(mapping[lIdx]===q.pairs[parseInt(lIdx)].right){bg="#e9f7ef";border="#3aab6b";color="#1a6b3e";}
                else{bg="#fdecea";border="#e05c4a";color="#8b2a1e";}
              }
            }
            return(
              <button key={i} onClick={()=>handleRight(r)} style={{
                textAlign:"left",padding:"11px 10px",borderRadius:10,
                border:`2px solid ${border}`,background:bg,color,
                fontSize:12,cursor:done?"default":"pointer",
                minHeight:52,display:"flex",alignItems:"center",
                WebkitTapHighlightColor:"transparent",
                transition:"background .15s",fontFamily:"inherit",
                fontWeight:600,lineHeight:1.4,
              }}>{r}</button>
            );
          })}
        </div>
      </div>

      {!done&&(
        <div style={{marginTop:12}}>
          <Btn onClick={check} disabled={!allMapped} color="#1a6b3e" bg="#e9f7ef" full>정답 확인</Btn>
        </div>
      )}
      {done&&(
        <div style={{marginTop:12,padding:"12px 14px",borderRadius:12,
          background:correct?"#e9f7ef":"#fdecea",
          border:`1.5px solid ${correct?"#3aab6b":"#e05c4a"}`,
          fontSize:13,color:correct?"#1a6b3e":"#8b2a1e"}}>
          {correct?"✅ 모두 정확하게 연결했습니다!":"❌ 틀린 연결이 있습니다."}
          {!correct&&(
            <div style={{marginTop:8}}>
              {q.pairs.map((p,i)=>(
                <div key={i} style={{fontSize:12,marginTop:4,lineHeight:1.5}}>
                  {mapping[i]===p.right?"✅":"❌"} {p.left} → <b>{p.right}</b>
                </div>
              ))}
            </div>
          )}
          <div style={{marginTop:8,opacity:0.8,fontSize:12}}>💡 {q.hint}</div>
        </div>
      )}
    </div>
  );
}

function ResultScreen({questions,results,onReset,onReview}){
  const correct=Object.values(results).filter(Boolean).length;
  const total=questions.length;
  const pct=Math.round((correct/total)*100);
  return(
    <div style={{padding:"24px 16px",maxWidth:520,margin:"0 auto",textAlign:"center",paddingBottom:40}}>
      <div style={{fontSize:56,marginBottom:8}}>{pct===100?"🎉":pct>=70?"😊":"📚"}</div>
      <div style={{fontSize:28,fontWeight:800,color:"#1a1a1a"}}>{correct} / {total}</div>
      <div style={{fontSize:14,color:"#888",marginTop:4}}>정답률 {pct}%</div>
      {correct<total&&(
        <div style={{marginTop:16,padding:"14px",background:"#fdecea",borderRadius:12,border:"1.5px solid #e05c4a",textAlign:"left"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#8b2a1e",marginBottom:8}}>❌ 틀린 문제 — 탭해서 다시 풀기</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {questions.map((q,i)=>results[q.id]===false&&(
              <button key={q.id} onClick={()=>onReview(i)} style={{
                padding:"6px 12px",borderRadius:20,fontSize:12,fontWeight:700,
                background:"#e05c4a",color:"#fff",border:"none",cursor:"pointer",
                minHeight:36,WebkitTapHighlightColor:"transparent",
              }}>Q{i+1}</button>
            ))}
          </div>
        </div>
      )}
      <div style={{display:"flex",flexWrap:"wrap",gap:5,justifyContent:"center",marginTop:16}}>
        {questions.map((q,i)=>(
          <button key={q.id} onClick={()=>onReview(i)} style={{
            width:36,height:36,borderRadius:8,fontSize:11,fontWeight:700,
            background:results[q.id]===true?"#e9f7ef":results[q.id]===false?"#fdecea":"#f5f5f5",
            border:`2px solid ${results[q.id]===true?"#3aab6b":results[q.id]===false?"#e05c4a":"#ddd"}`,
            color:results[q.id]===true?"#1a6b3e":results[q.id]===false?"#8b2a1e":"#bbb",
            cursor:"pointer",WebkitTapHighlightColor:"transparent",
          }}>{i+1}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:10,marginTop:24}}>
        <Btn onClick={onReset} color="#1a5f8a" bg="#e8f4fd" full>처음부터</Btn>
        <Btn onClick={()=>onReview(0)} color="#3aab6b" bg="#e9f7ef" full>다시 풀기</Btn>
      </div>
    </div>
  );
}

export default function App(){
  const[topicF,setTopicF]=useState("전체");
  const[typeF,setTypeF]=useState("전체");
  const[results,setResults]=useState({});
  const[idx,setIdx]=useState(0);
  const[mode,setMode]=useState("study");
  const topRef=useRef(null);

  const filtered=QUESTIONS.filter(q=>
    (topicF==="전체"||q.topic===topicF)&&
    (typeF==="전체"||q.type===typeF)
  );
  const total=filtered.length;
  const correct=Object.values(results).filter(Boolean).length;
  const q=filtered[idx];

  const scrollTop=()=>topRef.current?.scrollIntoView({behavior:"smooth",block:"start"});
  const goNext=()=>{if(idx<total-1){setIdx(i=>i+1);scrollTop();}else setMode("result");};
  const goPrev=()=>{if(idx>0){setIdx(i=>i-1);scrollTop();}};
  const reset=()=>{setResults({});setIdx(0);setMode("study");};
  const goReview=i=>{setIdx(i);setMode("study");scrollTop();};
  const handleResult=(id,ok)=>setResults(r=>({...r,[id]:ok}));
  const changeFilter=(type,val)=>{
    if(type==="topic")setTopicF(val);else setTypeF(val);
    setIdx(0);setResults({});
  };

  if(mode==="result"){
    return(
      <div style={WRAP}>
        <div ref={topRef} style={{padding:"14px 16px 10px",background:"#fff",borderBottom:"1px solid #f0f0f0"}}>
          <div style={{fontWeight:800,fontSize:16,color:"#1a1a1a",maxWidth:520,margin:"0 auto"}}>📡 네트워크관리사 2급</div>
        </div>
        <ResultScreen questions={filtered} results={results} onReset={reset} onReview={goReview}/>
      </div>
    );
  }

  return(
    <div style={WRAP}>
      {/* 스티키 헤더 */}
      <div ref={topRef} style={{background:"#fff",borderBottom:"1px solid #f0f0f0",
        padding:"12px 16px 10px",position:"sticky",top:0,zIndex:10}}>
        <div style={{maxWidth:520,margin:"0 auto"}}>
          <div style={{fontWeight:800,fontSize:16,color:"#1a1a1a",letterSpacing:-0.3}}>
            📡 네트워크관리사 2급 실기
          </div>
          {/* 유형 필터 */}
          <div style={{display:"flex",gap:6,marginTop:9,flexWrap:"wrap",paddingBottom:2}}>
            {[["전체","전체"],["short","단답형"],["multi","다중선택"],["match","연결하기"]].map(([v,l])=>(
              <button key={v} onClick={()=>changeFilter("type",v)} style={{
                flexShrink:0,padding:"6px 13px",borderRadius:20,fontSize:12,fontWeight:700,
                border:`2px solid ${typeF===v?"#1a5f8a":"#e0e0e0"}`,
                background:typeF===v?"#e8f4fd":"#fff",
                color:typeF===v?"#1a5f8a":"#999",cursor:"pointer",
                WebkitTapHighlightColor:"transparent",minHeight:32,
              }}>{l}</button>
            ))}
          </div>
          {/* 주제 필터 */}
          <div style={{display:"flex",gap:5,marginTop:6,flexWrap:"wrap",paddingBottom:2}}>
            {ALL_TOPICS.map(t=>{
              const c=TC(t);const active=topicF===t;
              return(
                <button key={t} onClick={()=>changeFilter("topic",t)} style={{
                  flexShrink:0,padding:"5px 10px",borderRadius:20,fontSize:11,fontWeight:700,
                  border:`2px solid ${active?c.border:"#e0e0e0"}`,
                  background:active?c.bg:"#fff",
                  color:active?c.text:"#999",cursor:"pointer",
                  WebkitTapHighlightColor:"transparent",minHeight:30,
                }}>{t}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 진행 바 */}
      <div style={{maxWidth:520,margin:"10px auto 0",padding:"0 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#999",marginBottom:5}}>
          <span style={{fontWeight:700,color:"#444"}}>{idx+1}<span style={{color:"#bbb",fontWeight:400}}>/{total}</span></span>
          <span>✅ {correct} 정답</span>
        </div>
        <div style={{height:5,background:"#eee",borderRadius:99}}>
          <div style={{height:"100%",borderRadius:99,background:"#3aab6b",
            width:`${total<=1?0:(idx/(total-1))*100}%`,transition:"width .3s"}}/>
        </div>
      </div>

      {/* 문제 카드 */}
      {q?(
        <div style={{maxWidth:520,margin:"10px auto 0",padding:"0 16px 160px"}}>
          <div style={{background:"#fff",borderRadius:16,padding:"18px 16px 20px",
            boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #f0f0f0"}}>
            {/* 태그 */}
            <div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}>
              <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,
                background:TC(q.topic).bg,color:TC(q.topic).text,border:`1.5px solid ${TC(q.topic).border}`}}>
                {q.topic}
              </span>
              <span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,
                background:"#f5f5f5",color:TYPE_CLR[q.type],border:`1.5px solid ${TYPE_CLR[q.type]}30`}}>
                {TYPE_LABEL[q.type]}
              </span>
              {results[q.id]===true&&<span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:"#e9f7ef",color:"#1a6b3e",border:"1.5px solid #3aab6b"}}>✅ 정답</span>}
              {results[q.id]===false&&<span style={{padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:700,background:"#fdecea",color:"#8b2a1e",border:"1.5px solid #e05c4a"}}>❌ 오답</span>}
            </div>
            {/* 질문 */}
            <div style={{fontSize:15,fontWeight:700,color:"#1a1a1a",marginBottom:16,lineHeight:1.65}}>
              {q.question}
            </div>
            {q.type==="short"&&<ShortQ key={q.id} q={q} onResult={ok=>handleResult(q.id,ok)}/>}
            {q.type==="multi"&&<MultiQ key={q.id} q={q} onResult={ok=>handleResult(q.id,ok)}/>}
            {q.type==="match"&&<MatchQ key={q.id} q={q} onResult={ok=>handleResult(q.id,ok)}/>}
          </div>

          {/* 번호 점프 */}
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:14,justifyContent:"center",
            paddingBottom:"calc(env(safe-area-inset-bottom) + 8px)"}}>
            {filtered.map((qq,i)=>(
              <button key={qq.id} onClick={()=>{setIdx(i);scrollTop();}} style={{
                width:34,height:34,borderRadius:8,fontSize:11,fontWeight:700,
                border:`2px solid ${i===idx?"#1a5f8a":results[qq.id]===true?"#3aab6b":results[qq.id]===false?"#e05c4a":"#ddd"}`,
                background:i===idx?"#e8f4fd":results[qq.id]===true?"#e9f7ef":results[qq.id]===false?"#fdecea":"#fafafa",
                color:i===idx?"#1a5f8a":results[qq.id]===true?"#1a6b3e":results[qq.id]===false?"#8b2a1e":"#ccc",
                cursor:"pointer",WebkitTapHighlightColor:"transparent",
              }}>{i+1}</button>
            ))}
          </div>
        </div>
      ):(
        <div style={{textAlign:"center",padding:60,color:"#bbb",fontSize:14}}>해당 조건의 문제가 없습니다.</div>
      )}

      {/* 하단 고정 네비 */}
      {q&&(
        <div style={{
          position:"fixed",bottom:0,left:0,right:0,
          background:"#fff",borderTop:"1px solid #f0f0f0",
          padding:"10px 16px",
          paddingBottom:"calc(10px + env(safe-area-inset-bottom))",
          zIndex:20,
        }}>
          <div style={{display:"flex",gap:10,maxWidth:520,margin:"0 auto"}}>
            <Btn onClick={goPrev} disabled={idx===0} color="#888" bg="#f5f5f5" full>← 이전</Btn>
            <Btn
              onClick={goNext}
              color={idx===total-1?"#3aab6b":"#1a5f8a"}
              bg={idx===total-1?"#e9f7ef":"#e8f4fd"}
              full
            >{idx===total-1?"결과 보기 →":"다음 →"}</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

const WRAP={
  minHeight:"100dvh",
  background:"#f7f8fc",
  fontFamily:"'Apple SD Gothic Neo','Pretendard','Noto Sans KR',sans-serif",
  WebkitFontSmoothing:"antialiased",
  paddingBottom:"calc(80px + env(safe-area-inset-bottom))",
};
