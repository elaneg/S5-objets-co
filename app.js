// app.js
document.addEventListener('DOMContentLoaded', function () {
    const serverURI = 'http://192.168.1.100';
    let deviceStatus = {
      temperature: 0,
      uptime: 0,
      wifi: { connected: false },
      cloud: { enabled: false, connected: false }
    };
    let deviceState = 'off';
  
    async function fetchDataFromServer() {
      try {
        const response = await fetch(`${serverURI}/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: "5033f99g20i7",
            authKey: "MWRmYzI5dWlk574C25F77F15968D1DBBEBE835D78BEB366FEE8E53293828CC3CE7A5E67EE3EDD1747DAA80D84D6D"
          }),
        });
  
        const responseData = await response.json();
        deviceStatus = responseData.data.device_status;
        updateUI();
      } catch (error) {
        console.error(error);
      }
    }
  
    function updateUI() {
      document.getElementById('temperature').innerText = `${deviceStatus.temperature} °`;
      document.getElementById('uptime').innerText = deviceStatus.uptime ? `${deviceStatus.uptime} seconds` : 'Offline';
      document.getElementById('wifi').innerText = deviceStatus.wifi.connected ? 'Online' : 'Offline';
      document.getElementById('cloud').innerText = deviceStatus.cloud.enabled ? 'Enabled' : 'Disabled';
      document.getElementById('cloud').innerText += deviceStatus.cloud.connected ? ', Connected' : ', Disconnected';
    }
  
    async function rebootDevice() {
      try {
        await fetch(`${serverURI}/reboot`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: "5033f99g20i7",
            authKey: "MWRmYzI5dWlk574C25F77F15968D1DBBEBE835D78BEB366FEE8E53293828CC3CE7A5E67EE3EDD1747DAA80D84D6D"
          }),
        });
  
        alert('Successfully rebooted');
      } catch (error) {
        console.error(error);
      }
    }
  
    async function toggleDevice() {
      const newState = deviceState === 'on' ? 'off' : 'on';
  
      try {
        await fetch(`${serverURI}/relay/0?turn=${newState}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: "5033f99g20i7",
            authKey: "MWRmYzI5dWlk574C25F77F15968D1DBBEBE835D78BEB366FEE8E53293828CC3CE7A5E67EE3EDD1747DAA80D84D6D"
          }),
        });
  
        deviceState = newState;
        alert(`Successfully turned ${deviceState}`);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchDataFromServer();
  });
  