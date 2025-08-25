fetch('/class-schedule/all')
  .then(res => res.json())
  .then(data => {
    const table = document.querySelector('#scheduleTable tbody');
    data.forEach(item => {
      table.innerHTML += `
        <tr>
          <td>${item.subject}</td>
          <td>${item.day}</td>
          <td>${item.time}</td>
          <td><a href="${item.zoomLink}" target="_blank">Join</a></td>
        </tr>`;
    });
  })
  .catch(err => console.error('Failed to load class schedule:', err));
