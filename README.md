# Frontend

## Usage

### run development server

```
$ yarn install
$ yarn run dev
```

### docker build

```
$ docker build --force-rm=true -t subicura/k8s-frontend .
```

### docker run

```
$ docker run -d -p 3000:3000 subicura/k8s-frontend
```

### kubenetes run

```
$ kubectl apply -f k8s-frontend.yml --record
$ kubectl get -f k8s-frontend.yml
$ open http://pongpong.io
```

---

## Libraries

- [typescript](http://www.typescriptlang.org/)
- [reactjs](https://reactjs.org/)
- [next.js](https://github.com/zeit/next.js/)
- [bootstrap](https://getbootstrap.com/)
- [now-ui-dashboard-react](https://github.com/creativetimofficial/now-ui-dashboard-react)
