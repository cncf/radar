name: Database Storage
themes:
  - headline: The most commonly adopted tools are open source.
    content: |
      The three tools that received the most “Adopt” votes (Prometheus, Grafana, Elastic) and the five tools that received the most total votes (Prometheus, Grafana, Elastic, Jaeger, OpenTelemetry) are all open source. 
      It was interesting to see that companies have adopted and maintained these open source systems and been able to scale them to large enough deployments with in-house investments. As it requires at least a small team to deploy, maintain, and scale these open source systems, companies seem to think this tradeoff is worth it compared to using SaaS providers. 
      At the same time, there doesn’t seem to be a clear delineation between companies running open source tooling and those adopting an observability SaaS platform in terms of size or engineering capabilities. Open standards such as OpenMetrics and OpenTelemetry are being adopted regardless of whether companies are using open source or SaaS solutions. Plus, some of the companies that ultimately adopted SaaS platforms did go through the process of evaluating and prototyping self-managed platforms before deciding against it. Perhaps the conclusion to draw is that a quick pace of new technologies require new observability techniques, which in turn require almost constant evaluation and adoption of new tools.
  - headline: There’s no consolidation in the observability space.
    content: |
      Many companies are using multiple tools: Half of the companies are using 5 or more tools, and a third of them had experience with 10+ tools. 
      Observability inherently requires looking at the data from different views to try to answer questions. Different tools have strengths in different techniques and integrations, which may be the reason why end users end up with multiple tools. Once adopted, it may be difficult to switch from one set of tools to another or to even consolidate. For most end users, observability is not their core business, so the investment needed to switch tools is often not easily funded. This may be a large reason why there are so many "Adopt" votes in this radar.
      
      Anecdotally, companies are constantly experimenting with and introducing new tools, looking for better ways to observe things. With the advent of cloud native technologies like Kubernetes, different tools are needed for monitoring. For example, Nagios was really popular five years ago, but not as relevant now for users who need to monitor Kubernetes workloads. 
  - headline: Prometheus and Grafana are frequently used together.
    content: |
      Two-thirds of the respondents are using these two tools in conjunction. This comes as no surprise, but the high correlation is still interesting to note. Momentum behind both projects, coupled with little competition, could have helped them gain such a high rate of adoption. Plus, there are many tutorials and installers that make it easy to use them together. There’s minimal resistance to using them hand-in-hand.
      
team:
  - name: Jackie Fong
    photo: https://media-exp1.licdn.com/dms/image/C4E03AQFTKuqDY0pAgQ/profile-displayphoto-shrink_800_800/0?e=1605139200&v=beta&t=Xc7d5pFfgmk6Sz0ECN0vowegzrlj8KFgOKw54UnRbHs
    bio: |
      Jackie is an Engineering Leader in the Platform organization at Ticketmaster responsible for Container Orchestration, CI/CD, Observability, and Developer Experience. At the beginning of 2020, Jackie started a Service Mesh End User Group at CNCF and serves as a co-chair.
        title: Engineering Leader at Ticketmaster
  - name: Smaïne Kahlouch
    photo: https://www.cncf.io/wp-content/uploads/2020/08/smaine_square-1.jpg
    bio: |
      Smaïne is a DevOps Team Leader at Dailymotion. He leads a team in charge of building a reliable and scalable platform as well as the release management.
He is the organizer of the Cloud Native Computing Foundation meetup in Paris and a CNCF Ambassador in France.
    twitter: _smana_
    title: DevOps Team Leader at Dailymotion
  - name: Mya Pitzeruse
    photo: https://mjpitz.com/statics/img/mjpitz.jpeg
    bio: |
      Mya was the Principal Engineer for the Service Platforms Group at Indeed, where she designed and guided the development of their cloud native platform across compute, storage, and observability.
    twitter: myajpitz
    title: Principal Engineer at Indeed
  
  
points:
  - name: Redis
    homepage: https://redis.io/
    level: adopt
    votes:
      adopt: 26
      trial: 0
      assess: 0
      hold: 1
  - name: ElasticSearch
    repo: elastic/elasticsearch
    level: adopt
    votes:
      adopt: 24
      trial: 2
      assess: 0
      hold: 0
  - name: PostgreSQL
    homepage: https://www.postgresql.org/
    level: adopt
    votes:
      adopt: 21
      trial: 1
      assess: 0
      hold: 1
  - name: MySQL
    homepage: https://www.mysql.com/
    level: adopt
    votes:
      adopt: 15
      trial: 0
      assess: 0
      hold: 5
  - name: MongoDB
    homepage: https://www.mongodb.com/
    level: trial
    votes:
      adopt: 9
      trial: 0
      assess: 2
      hold: 6
  - name: Apache Kafka
    homepage: https://kafka.apache.org/
    level: trial
    votes:
      adopt: 15
      trial: 1
      assess: 1
      hold: 1
  - name: Memcached
    homepage: https://memcached.org/
    level: adopt
    votes:
      adopt: 13
      trial: 0
      assess: 0
      hold: 2
  - name: Cassandra
    homepage: https://cassandra.apache.org/
    level: trial
    votes:
      adopt: 7
      trial: 2
      assess: 1
      hold: 4
  - name: Aurora
    homepage: https://aws.amazon.com/rds/aurora/
    level: trial
    votes:
      adopt: 9
      trial: 0
      assess: 3
      hold: 0
  - name: Consul
    repo: hashicorp/consul
    level: trial
    votes:
      adopt: 7
      trial: 1
      assess: 0
      hold: 2
  - name: BigQuery
    homepage: https://cloud.google.com/bigquery/
    level: trial
    votes:
      adopt: 4
      trial: 1
      assess: 2
      hold: 0
  - name: MariaDB
    homepage: https://mariadb.org/
    level: assess
    votes:
      adopt: 3
      trial: 1
      assess: 0
      hold: 2
  - name: CloudSQL
    homepage: https://cloud.google.com/sql
    level: trial
    votes:
      adopt: 4
      trial: 0
      assess: 1
      hold: 1
  - name: AWS DynamoDB
    homepage: https://aws.amazon.com/dynamodb/
    level: trial
    votes: 
      adopt: 5
      trial: 1
      assess: 0
      hold: 0
  - name: Cockroach DB
    repo: cockroachdb/cockroach
    level: assess
    votes: 
      adopt: 0
      trial: 0
      assess: 5
      hold: 0
  - name: Vitess
    homepage: https://vitess.io/
    level: assess
    votes: 
      adopt: 0
      trial: 1
      assess: 3
      hold: 1
companies:
  - indeed-member
  - ticket-master-supporter
  - dailymotion-supporter
  - equity-zen-supporter
  - pay-it-supporter
  - under-armour-supporter  
  - meltwater-supporter
  - zendesk-supporter
  - ksat-supporter
  - box-supporter
  - intuit-member
  - anova-supporter
  - thermo-fisher-scientific-supporter
  - shopify-supporter
  - gmx-supporter
  - spotify-member
  - zalando-supporter  
  - net-match-supporter
  - apple-member
  - trivago-supporter
  - auth-keys-supporter 
  - mastercard-member
  - the-new-york-times-supporter
  - lunar-supporter
  - uswitch-supporter
  - n26-supporter  
  
