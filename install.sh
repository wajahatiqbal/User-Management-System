docker build -t project .
docker run -d -p "3000:3000" -p "4000:4000" -e MONGO_URL=mongodb+srv://admin:1VKK1qMCgO8UrJSs@cluster0-qiib2.mongodb.net/test?retryWrites=true --name react-app project
