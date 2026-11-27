"""Build pb_public/index.html from the approved prototype screens plus the live PocketBase layer.
Run from the repository root: python3 tools/build.py"""
import re,shutil,os
src=open('src/prototype.html',encoding='utf-8').read()
lines=src.split('\n')
def cut(start_prefix,end_prefix,replacement):
    global lines
    i=next(n for n,l in enumerate(lines) if l.startswith(start_prefix))
    j=next(n for n in range(i,len(lines)) if lines[n].startswith(end_prefix))
    lines=lines[:i]+replacement+lines[j:]
# sample data out, empty stores in
cut('/* Sample data:','const C=id=>',['const users=[];let tid=0;const tasks=[];const clients=[];let cid=0;'])
cut('/* Time tracking:','const fh=h=>',['/* Time tracking: estimate when created, hours spent when done */'])
cut('/* Telegram links and KPI','/* Notifications */',['const tg={},tgCode={},tgPick={},kpiConf={};',''])
cut('[["company","","Price list','const KIND=',[])
cut('addNote({owner:"u2",title:"Office supplies','const canSee=',[])
cut('/* Seed notifications','/* Weekly reports:',[])
cut('users.filter(u=>u.active&&u.role!=="admin").forEach((u,ui)=>{for(let i=0;i<6;i++)','let rid=0;',[])
cut('function addRep(uid,status,extra)','const chipOf=',[])
s='\n'.join(lines)
def rep(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:80],s.count(a)); s=s.replace(a,b)
rep('<title>Preahchan Tasks Prototype</title>','<title>Preahchan Tasks</title>\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<link rel="icon" href="icons/favicon-32.png" type="image/png">\n<link rel="manifest" href="manifest.json">\n<meta name="theme-color" content="#f7f4ec">\n<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="Preahchan">\n<meta name="apple-mobile-web-app-status-bar-style" content="default">')
rep('me:"u2",','me:null,')
rep('<span class="sample">${t("sample")}</span>','')
rep('u.id==="u1"','u.id===S.me',2)
rep('const m=me(),canAssign=m.role==="manager";','const m=me(),canAssign=m.role!=="staff";')
rep('${clickable?` · <span class="${kpiConf[u.id]?"conf":""}">${kpiConf[u.id]?t("kpiConfirmed"):t("kpiNotConfirmed")}</span>`:""}','${clickable?repChip(u.id):""}')
rep('   case "kpi":{const u=me();return fill(t("tK"),doneWeek(u.id).length,u.kpi)}','   case "kpi":{const u=me();return fill(t("tK"),doneWeek(u.id).length,u.kpi)}\n   case "noteRemind":{const nt=notes.find(x=>x.id===p.note);return fill(t("noteRemindN"),"","<b>"+esc(nt?(nt.title||t("notes")):(p.title||t("notes")))+"</b>")}')
rep('<div id="app"></div>','<div id="app"></div>\n<script src="pocketbase.umd.js"></script>')
rep('account:vAccount,report:vReport,reports:vReports}','account:vAccount,report:vReport,reports:vReports,settings:vSettings,costs:vCosts,time:vTime,client:vClient,audit:vAudit,projects:vProjects,project:vProject,calendar:vCalendar}')
rep('<button class="iconbtn" data-act="bell"','${installBtn()}<button class="iconbtn" data-act="bell"')
rep('notifs:dNotifs,log:dLog}','notifs:dNotifs,log:dLog,handoff:dHandoff,stEdit:dStEdit,ttEdit:dTtEdit,poEdit:dPoEdit,upos:dUpos,uedit:dUedit,uteam:dUteam,salary:dSalary,install:dInstall,finish:dFinish,editlog:dEditLog,logday:dLogDay,client:dClient,project:dProject,meeting:dMeeting,wikipage:dWikiPage,guide:dGuide,movein:dMoveIn}')
rep('&&S.view!=="client"&&S.view!=="project")S.view=NAV','&&S.view!=="client"&&S.view!=="project")S.view=NAV')
s=s.replace('</style>\n\n<div id="app">','\n'+open('src/workflow.css',encoding='utf-8').read()+'</style>\n\n<div id="app">',1)
live=open('src/live.js',encoding='utf-8').read()
wf=open('src/workflow.js',encoding='utf-8').read()+'\n'+open('src/rich.js',encoding='utf-8').read()+'\n'+open('src/costs.js',encoding='utf-8').read()+'\n'+open('src/pwa.js',encoding='utf-8').read()+'\n'+open('src/taskedit.js',encoding='utf-8').read()+'\n'+open('src/stages.js',encoding='utf-8').read()+'\n'+open('src/board.js',encoding='utf-8').read()+'\n'+open('src/profile.js',encoding='utf-8').read()+'\n'+open('src/clients.js',encoding='utf-8').read()+'\n'+open('src/audit.js',encoding='utf-8').read()+'\n'+open('src/projects.js',encoding='utf-8').read()+'\n'+open('src/customflow.js',encoding='utf-8').read()+'\n'+open('src/calendar.js',encoding='utf-8').read()+'\n'+open('src/guard.js',encoding='utf-8').read()
assert '/* Start */' in live
live=live.replace('/* Start */',wf+'\n/* Start */',1)
rep('\nrender();\n</script>','\n'+live+'\n</script>')
# the page is served as a full document by PocketBase, so give it the skeleton the artifact host used to add
s='<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'+s.replace('<div id="app"></div>','</head>\n<body>\n<div id="app"></div>',1)+'\n</body>\n</html>\n'
os.makedirs('pb_public',exist_ok=True)
open('pb_public/index.html','w',encoding='utf-8').write(s)
shutil.copy('vendor/pocketbase.umd.js','pb_public/pocketbase.umd.js')
shutil.copy('src/pwa/manifest.json','pb_public/manifest.json')
shutil.copy('src/pwa/sw.js','pb_public/sw.js')
print('built pb_public/index.html',len(s),'bytes')
