document.addEventListener("DOMContentLoaded", function() {
    var banner = document.getElementById("cookie-consent-banner");
    var modal = document.getElementById("cookie-preferences-modal");
    var closeModal = document.querySelector(".modal .close");
    var savePreferencesButton = document.getElementById("save-preferences");
    var allowAllCookiesButton = document.getElementById("allow-all-cookies");
    var denyAllCookiesButton = document.getElementById("deny-all-cookies");
    var choosePreferencesButton = document.getElementById("choose-preferences");
  
    function showBanner() {
      banner.style.display = "block";
    }
  
    function hideBanner() {
      banner.style.display = "none";
    }
  
    function showModal() {
      modal.style.display = "block";
    }
  
    function hideModal() {
      modal.style.display = "none";
    }
  
    function loadScriptsBasedOnConsent(consent) {
      if (consent.analytics_storage) {
        loadGoogleAnalytics();
      }
      if (consent.ad_storage) {
        loadGoogleAds();
      }
      if (consent.ad_user_data) {
        loadFacebookAds();
      }
      if (consent.ad_personalization) {
        loadGoogleAnalytics();
      }
      if (consent.functionality_storage) {
        loadFacebookAds();
      }
      if (consent.personalization_storage) {
        loadFacebookAds();
      }
    }
  
    function loadGoogleAnalytics() {
      var script = document.createElement('script');
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-KMDRNGZ9LR";
      script.async = true;
      document.head.appendChild(script);
      script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KMDRNGZ9LR');
      };
    }
  
    function loadGoogleAds() {
      var script = document.createElement('script');
      script.src = "https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID"; // Reemplaza con tu ID de Google Ads
      script.async = true;
      document.head.appendChild(script);
      script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-CONVERSION_ID'); // Reemplaza con tu ID de Google Ads
      };
    }
  
    function loadFacebookAds() {
      var script = document.createElement('script');
      script.src = "https://connect.facebook.net/en_US/fbevents.js";
      script.async = true;
      document.head.appendChild(script);
      script.onload = function() {
        fbq('init', 'FACEBOOK_PIXEL_ID'); // Reemplaza con tu ID de Facebook Pixel
        fbq('track', 'PageView');
      };
    }
  

  
    function setConsent(consent) {
      localStorage.setItem('cookieConsent', JSON.stringify(consent));
      hideBanner();
      hideModal();
      loadScriptsBasedOnConsent(consent);
    }
  
    // Mostrar banner si el consentimiento no está guardado
    if (!localStorage.getItem('cookieConsent')) {
      showBanner();
    }
  
    allowAllCookiesButton.addEventListener('click', function() {
      setConsent({
        analytics_storage: true,
        ad_storage: true,
        ad_user_data: true,
        ad_personalization: true,
        functionality_storage: true,
        personalization_storage: true,
        security_storage: true
      });
    });
  
    denyAllCookiesButton.addEventListener('click', function() {
      setConsent({
        analytics_storage: false,
        ad_storage: false,
        ad_user_data: false,
        ad_personalization: false,
        functionality_storage: false,
        personalization_storage: false,
        security_storage: true
      });
    });
  
    choosePreferencesButton.addEventListener('click', function() {
      showModal();
    });
  
    closeModal.addEventListener('click', function() {
      hideModal();
    });
  
    savePreferencesButton.addEventListener('click', function() {
      var consentCategories = {
        analytics_storage: document.querySelector('input[name="analytics_storage"]').checked,
        ad_storage: document.querySelector('input[name="ad_storage"]').checked,
        ad_user_data: document.querySelector('input[name="ad_user_data"]').checked,
        ad_personalization: document.querySelector('input[name="ad_personalization"]').checked,
        functionality_storage: document.querySelector('input[name="functionality_storage"]').checked,
        personalization_storage: document.querySelector('input[name="personalization_storage"]').checked,
        security_storage: true // Asumido como necesario
      };
  
      setConsent(consentCategories);
    });
  
    // Cargar scripts si ya se ha dado consentimiento
    var storedConsent = JSON.parse(localStorage.getItem('cookieConsent') || '{}');
    loadScriptsBasedOnConsent(storedConsent);
  });
  