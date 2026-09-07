export const years=[...Array.from({length:46},(_,i)=>String(2026-i)),'1980년 이전'];
const origin=['베트남','인도','대한민국','태국','일본','중국','미국','독일','대만','기타 국가'];
const fuel=['휘발유','디젤','하이브리드','전기'];
const warranty=['1~6개월','7~11개월','1년','2년','3년','3년 초과'];
const f=(key,label,required=false,options=null,type='text',suffix=null)=>({key,label,required,options,type,suffix});
const brand=f('brand','제조사',true),year=f('year','제조연도',true,years),country=f('origin','원산지',false,origin),color=f('color','색상'),guarantee=f('warranty','보증 기간',false,warranty);
const km={...f('km','주행거리',true,null,'number','km'),usedOnly:true};
export const categories={
 motorcycle:{label:'오토바이',documents:true,minPrice:1000000,fields:[brand,f('model','모델명',true),year,f('type','차량 종류',true),km,f('capacity','배기량',false,['50cc 미만','50~100cc','100~175cc','175cc 초과','잘 모르겠음']),country,guarantee]},
 car:{label:'자동차',documents:true,minPrice:5000000,fields:[brand,f('model','모델명',true),year,f('transmission','변속기',true,['자동','수동','반자동']),f('fuel','연료',true,fuel),country,f('seats','좌석 수',false,null,'number','석'),f('bodyStyle','차체 형태'),color,km,{...f('owners','이전 소유자 수',false,['1명','2명 이상']),usedOnly:true},{...f('accessories','추가 부속품 포함',false,['예','아니요']),usedOnly:true},{...f('inspection','차량 검사 유효',false,['예','아니요']),usedOnly:true}]},
 truck:{label:'트럭 / 덤프트럭',documents:false,minPrice:5000000,fields:[f('brand','트럭 제조사',true),f('payload','적재량',true,['1톤 미만',...Array.from({length:17},(_,i)=>(i+2)+'톤'),'18톤 초과']),year,f('fuel','연료',true,fuel),country,color,km]},
 bicycle:{label:'자전거',documents:false,minPrice:1,fields:[brand,f('bicycleType','자전거 종류',true),country,color,f('frameSize','프레임 크기'),f('frameMaterial','프레임 소재'),guarantee]},
 other:{label:'기타 차량',documents:false,minPrice:1,fields:[f('type','차량 종류',true),year,f('fuel','연료',false,fuel),country,color,guarantee]},
 parts:{label:'차량 부품',documents:false,minPrice:1,fields:[f('partType','부품 종류',true,['오토바이 부품','자동차 부품','자전거 부품','전기 차량 부품','트럭 / 덤프트럭 부품','기타 부품']),country]}
};
export const detailKeys=[...new Set(Object.values(categories).flatMap(c=>c.fields.map(f=>f.key)))];
export function activeFields(category,condition){return categories[category].fields.filter(f=>!f.usedOnly||condition==='중고')}
export function detailErrors(category,form){const errors={};for(const f of activeFields(category,form.condition)){const value=String(form[f.key]??'').trim();if(f.required&&!value)errors[f.key]='필수 항목을 입력해 주세요.';else if(value&&f.options&&!f.options.includes(value))errors[f.key]='목록에서 선택해 주세요.';else if(value&&f.type==='number'&&(!Number.isFinite(Number(value))||Number(value)<0||!Number.isInteger(Number(value))))errors[f.key]='0 이상의 정수를 입력해 주세요.';}return errors}
export function currentDetails(category,form){return Object.fromEntries(activeFields(category,form.condition).map(f=>[f.key,form[f.key]??'']))}

