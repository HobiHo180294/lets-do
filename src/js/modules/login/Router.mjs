import renderRegistrationForm from './_UI.mjs';

const requestEndpoints = {
  root: '/',
  login: '/login',
  registration: '/registration',
};

const DEFAULT_PATHNAME = requestEndpoints.login;

export default class Router {
  static renderContent() {
    const curentPathname = window.location.pathname;

    switch (curentPathname) {
      case requestEndpoints.root:
      case requestEndpoints.registration:
        renderRegistrationForm();
        break;

      case requestEndpoints.login:
        console.log('This is login page!');

        break;

      default:
        console.log('404 not found');
    }
  }

  static handlePageState(event) {
    event.preventDefault();
    const targetURL = event.target.getAttribute('href');

    if (targetURL !== window.location.pathname) {
      window.history.pushState(
        {
          requestEndpoint: targetURL,
        },
        '',
        targetURL
      );

      this.renderContent();
    }
  }

  static triggerOnPageLoad() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('unload', Date.now());
    });

    const DECIDED_TIME = 1000;

    const lastUnload = localStorage.getItem('unload');
    const lastUnloadTimestamp = parseInt(lastUnload, 10);

    if (lastUnload)
      if (Date.now() - lastUnloadTimestamp <= DECIDED_TIME) {
        let currentPathname = DEFAULT_PATHNAME;

        if (
          window.location.pathname === requestEndpoints.root ||
          window.location.pathname === requestEndpoints.login
        )
          currentPathname = DEFAULT_PATHNAME;
        else currentPathname = window.location.pathname;

        window.history.replaceState(
          {
            requestEndpoint: currentPathname,
          },
          '',
          currentPathname
        );

        this.renderContent();
      } else {
        window.history.replaceState(
          {
            requestEndpoint: requestEndpoints.login,
          },
          '',
          requestEndpoints.login
        );
        this.renderContent();
      }
  }
}
