import { colorresource } from 'app/resources/colorresource';

export const init = () => {
  window.fcWidget.init({
    token: "4d1f51cc-687c-4e81-9ec9-e3d0105ede1d",
    host: "https://wchat.freshchat.com",
    config: {
      headerProperty: {
        //Set Widget to be left to right.
        direction: 'ltr',
        backgroundColor: colorresource.liteblue,
        appLogo: 'https://seller.wishbook.io/app/img/logo-single.png',
        hideChatButton: true,
      },
      // showFAQOnOpen: true,
    }
  });

  window.fcWidget.on("widget:closed", function(resp) {
    console.log('Widget Closed');
    window.fcWidget.hide()
  });
}

export const showConversations = () => {
  window.fcWidget.open()
  window.fcWidget.show()
}

export const showFAQs = () => {
  window.fcWidget.open();
  window.fcWidget.show()
}

export const chatWbSupport = () => {
  window.fcWidget.open({name: 'Wishbook Support'})
}

/*
https://jsfiddle.net/9s6qLd3x/2/

<script src="https://wchat.freshchat.com/js/widget.js"></script>

<button onclick="fcButton(1)">Chat with us</button><button onclick="fcButton(2)">Chat with FAQ</button>

<script>
  function fcButton(x) {
    if (x == 1) {
      if (window.fcWidget.isInitialized() == false) {
        fcchatOpen(false);
      } else {
        window.fcWidget.close();
        window.fcWidget.destroy();
        setTimeout(function() {
          fcchatOpen(false)
        }, 400);
      }
    } else if (x == 2) {
      if (window.fcWidget.isInitialized() == false) {
        fcchatOpen(true);
      } else {
        window.fcWidget.close();
        window.fcWidget.destroy();
        setTimeout(function() {
          fcchatOpen(true)
        }, 400);
      }
    }
  }

  function fcchatOpen(faqopenVal) {
    window.fcWidget.init({
      token: "8d3a4a04-5562-4f59-8f66-f84a269897a1",
      host: "https://wchat.freshchat.com",
      open: "true",
      config: {
        showFAQOnOpen: faqopenVal,
        headerProperty: {
          hideChatButton: true
        }
      }
    });
  }

</script>


*/