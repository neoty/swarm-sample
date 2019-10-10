FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY app1.devs.kr /etc/nginx/conf.d/app1.devs.kr.conf
COPY app2.devs.kr /etc/nginx/conf.d/app2.devs.kr.conf

EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
