export default function swDev(){

  // const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

  // if ('serviceWorker' in navigator) {
  //   window.addEventListener('load', () => {
  //     navigator.serviceWorker
  //     .register(swUrl)
  //     .then((registration) => {
  //       console.log('Service Worker Registered');
  //       console.log('Registration', registration);
  //     })
  //     .catch((error) => {
  //       console.error('Service Worker registration failed:', error);
  //     });
  //   })
  // } else {
  //   console.warn('Service Worker is not supported in this browser');
  // }




  const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Workers registered in production mode');
        console.log('Registration', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
} else {
  console.warn('Service Worker is not supported in this browser or not in production mode');
}


}
