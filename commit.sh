
#git config user.email "duernna@163.com"
#git config user.name  "AllStarGH"

#git remote add origin https://github.com/AllStarGH/engineering00.git

git status

git add .  

git commit -m "优化了目录结构,主要是utils"

# 提示：更新被拒绝，因为您当前分支的最新提交落后于其对应的远程分支。
# 提示：再次推送前，先与远程变更合并（如 'git pull ...'）。详见
# 提示：'git push --help' 中的 'Note about fast-forwards' 小节。
# 采用下面这句
# git pull origin master --allow-unrelated-histories

#master:当前分支名
git pull origin master

#报错:fatal: 无法找到远程引用 master
#首次提交,可忽略不计

git push origin master  
