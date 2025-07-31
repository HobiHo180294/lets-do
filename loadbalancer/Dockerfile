FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE ${BACKEND_3000}
EXPOSE ${BACKEND_3001}
EXPOSE ${BACKEND_3002}

CMD ["nginx", "-g", "daemon off;"]