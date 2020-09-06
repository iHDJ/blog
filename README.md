# README

```bash
docker-compose up -d

#in rails container:
docker-compose exec rails bash
bundle
rails db:create && rails db:migrate && rails db:seed
rails s -b 0.0.0.0
#in web container
docker-compose exec web bash
cd /app
yarn && yarn start
#in host, open chrome browser, input http://localhost:8888
```
