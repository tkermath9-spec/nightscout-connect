// Edit these values to update the site.
const CONFIG = {
  aav: 8700000,                                  // Larkin's $8.7M AAV (8 yrs, thru 2030-31)
  seasonDays: 186,                               // NHL regular-season days (pay period)
  seasonGames: 82,
  suspendedAt: '2026-10-29T00:00:00-04:00',      // indefinite suspension start (Detroit time)
  gamesMissed: 0,                                // bump by hand as games go by
  buys: [
    { name: 'Coney dogs (Lafayette)', price: 5.5 },
    { name: 'Little Caesars Hot-N-Ready pizzas', price: 6 },
    { name: 'Red Wings tickets (upper bowl)', price: 60 },
    { name: 'Hockey sticks (Bauer Vapor)', price: 300 },
    { name: 'Jersey with captain "C" patch', price: 250 },
  ],
};

const perDay = CONFIG.aav / CONFIG.seasonDays;
const perSec = perDay / 86400;
const perGame = CONFIG.aav / CONFIG.seasonGames;
const start = new Date(CONFIG.suspendedAt).getTime();

const usd = (n, d = 2) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: d, maximumFractionDigits: d });
const $ = (id) => document.getElementById(id);

$('perDay').textContent = usd(perDay, 0);
$('perHour').textContent = usd(perDay / 24, 0);
$('perSec').textContent = usd(perSec);
$('perGame').textContent = usd(perGame, 0);
$('games').textContent = CONFIG.gamesMissed;
$('gamesLost').textContent = usd(CONFIG.gamesMissed * perGame, 0);
$('since').textContent = 'Suspended indefinitely since ' +
  new Date(start).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Detroit' });

const buysEl = $('buys');
const rows = CONFIG.buys.map((b) => {
  const li = document.createElement('li');
  li.innerHTML = '<span></span><b></b>';
  li.firstChild.textContent = b.name;
  buysEl.appendChild(li);
  return li.lastChild;
});

function tick() {
  const elapsed = Math.max(0, (Date.now() - start) / 1000);
  const lost = elapsed * perSec;
  $('total').textContent = usd(lost);
  CONFIG.buys.forEach((b, i) => { rows[i].textContent = Math.floor(lost / b.price).toLocaleString('en-US'); });
}
tick();
setInterval(tick, 100);
