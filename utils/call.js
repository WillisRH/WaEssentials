async function handleCall(client, call, status) {
    if (status === 'busy') {
      if (call.isGroup) {
        await call.reject();
        return;
      }
      await call.reject();
  
      // Send a message to the caller
      const message = `Sorry, I am currently busy and cannot answer your call.\n\nMaaf saya sedang sibuk, dan tidak bisa menjawab panggilan anda.(Pesan Otomatis/Auto Send)`;
      await client.sendMessage(call.from, message);
    }
  }
  
  module.exports = handleCall;
  