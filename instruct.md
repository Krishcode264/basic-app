🔧 Assumptions (your setup)
repo-root/
├── frontend/   (Vite React)
│    └── Dockerfile
├── backend/    (Node/Express)
│    └── Dockerfile
└── README.md

✅ 1. DevOps Basics (for viva mostly)
Keep this in your head:
DevOps = Development + Operations
Goal = faster + reliable delivery
Core concepts:
CI → Continuous Integration
CD → Continuous Delivery/Deployment
Automation
Monitoring
DevOps Engineer does:
CI/CD pipelines (Jenkins)
Containerization (Docker)
Infra automation (Ansible)
Monitoring (Splunk/Nagios)
👉 No coding needed here usually

✅ 2. Git setup (local version control)
Install Git
git --version
Initialize repo
git init
git add .
git commit -m "initial commit"
Track changes
git status
git add backend/
git commit -m "backend update"

✅ 3. GitHub sync (VERY IMPORTANT practical)
Connect to GitHub
git remote add origin https://github.com/<your-username>/<repo>.git
git branch -M main
git push -u origin main
Pull & Push workflow
git pull origin main
git add .
git commit -m "update"
git push
Branching (they may ask)
git checkout -b feature-x
git merge feature-x

🚀 4. Deploy app using Jenkins
You said skip setup → good, I’ll focus on pipeline + execution.
Step 1: Install plugins in Jenkins
Git
Pipeline
Docker

Step 2: Create Jenkins job
New Item → Pipeline
Connect GitHub repo

Step 3: Basic Jenkinsfile
Put this in your repo root:
pipeline {
   agent any

   stages {
       stage('Clone Repo') {
           steps {
               git 'https://github.com/<your-username>/<repo>.git'
           }
       }

       stage('Backend Install') {
           steps {
               dir('backend') {
                   sh 'npm install'
               }
           }
       }

       stage('Frontend Install') {
           steps {
               dir('frontend') {
                   sh 'npm install'
               }
           }
       }

       stage('Build Frontend') {
           steps {
               dir('frontend') {
                   sh 'npm run build'
               }
           }
       }

       stage('Run Backend') {
           steps {
               dir('backend') {
                   sh 'node index.js &'
               }
           }
       }
   }
}

🔁 5. Jenkins Pipeline (Declarative vs Scripted)
Declarative (used above)
Cleaner, recommended.
Scripted version (for viva)
node {
   stage('Clone') {
       git 'https://github.com/<repo>'
   }

   stage('Install') {
       dir('backend') {
           sh 'npm install'
       }
   }
}
👉 Key difference:
Declarative → structured
Scripted → flexible

🧪 6. Jenkins + Testing (Selenium/TestNG)
Since you’re using JS stack → use Jest instead (allowed usually)
Install Jest in backend
npm install jest --save-dev
Add test
// backend/test/sample.test.js
test('basic test', () => {
 expect(1 + 1).toBe(2);
});
Update package.json
"scripts": {
 "test": "jest"
}
Add Jenkins stage
stage('Run Tests') {
   steps {
       dir('backend') {
           sh 'npm test'
       }
   }
}

🧠 7. Jenkins Master-Slave (Agent)
Concept:
Master → controls pipeline
Slave/Agent → executes jobs
Practical (simple way):
Go Jenkins → Manage Nodes → Add Node
Connect via SSH
Pipeline using agent:
pipeline {
   agent { label 'slave-node' }

   stages {
       stage('Build') {
           steps {
               sh 'echo Running on slave'
           }
       }
   }
}

🐳 8. Docker Basics (you already did most)
Commands:
docker build -t backend-app ./backend
docker build -t frontend-app ./frontend

docker run -p 5000:5000 backend-app
docker run -p 3000:3000 frontend-app
Check:
docker ps
docker images
docker stop <container-id>

🐳 9. Dockerfile (you said already done, but verify)
Backend Dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
Frontend Dockerfile
FROM node:18 as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

⚙️ 10. Ansible (Continuous Deployment)
Install:
sudo apt install ansible
Inventory file
[servers]
localhost ansible_connection=local
Playbook (deploy docker app)
- hosts: servers
 tasks:
   - name: Pull backend image
     command: docker pull backend-app

   - name: Run backend container
     command: docker run -d -p 5000:5000 backend-app
Run:
ansible-playbook playbook.yml -i inventory

📊 11. Monitoring (Splunk / Nagios)
Easy demo (use Node logging instead)
Install:
npm install morgan
Use:
const morgan = require('morgan');
app.use(morgan('dev'));
👉 For viva:
Splunk → log analysis
Nagios → system monitoring

