const stores = require('../../stores');

module.exports = (app) => {
	app.get('/test/single', (req, res) => {
		// const uri = 'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga-';
		const uri2 = 'http://www.terabyteshop.com.br/produto/6944/placa-de-video-xfx-radeon-r7-250x-2gb-gddr3-r7-250x-cgf4-pci-exp';
		// const uri3 = 'http://www.pichau.com.br/placa-de-video-xfx-radeon-rx-470-4g-gddr5-oc-rx-470p4sfd5';

		stores.createItemFromStore(uri2, 'terabyte').then(item => res.send(item));
	});

	app.get('/test/multiple', (req, res) => {
		/*const uris = [
			'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga-',
			'http://www.kabum.com.br/produto/59210/drive-lg-gravador-dvd-rw-24x-sata-preto-gh24nsc0',
			'http://www.kabum.com.br/produto/55934/cartucho-de-tinta-hp-662-preto-cz103ab',
			'http://www.kabum.com.br/produto/77482/smartphone-alcatel-pixi-4-4034e-quad-core-android-6-0-tela-4-8mp-8gb-dual-chip-desbloqueado-preto-capas-extras',
			'http://www.kabum.com.br/produto/65593/fragmentadora-aurora-corte-tiras-6mm-12-folhas-cartaogrampo-cesto-com-18l-110v-as1210sb',
			'http://www.kabum.com.br/produto/65421/baqueta-liverpool-classic-series-7a-ponta-nylon-ll-7an-par',
			'http://www.kabum.com.br/produto/50757/memoria-kingston-hyperx-fury-4gb-1866mhz-ddr3-cl10-black-series-hx318c10fb-4',
		];


		const uris2 = [
			'http://www.terabyteshop.com.br/produto/6684/placa-de-video-sapphire-radeon-rx-480-nitro-8gb-11260-07-20G-256bit-gddr5-chdmi-pci-exp',
			'http://www.terabyteshop.com.br/produto/5993/placa-de-video-xfx-radeon-r9-380x-r9-380x-4db5-black-edition-oc-gddr5-c-hdmi-pci-exp',
			'http://www.terabyteshop.com.br/produto/6944/placa-de-video-xfx-radeon-r7-250x-2gb-gddr3-r7-250x-cgf4-pci-exp',
			'http://www.terabyteshop.com.br/produto/6949/placa-de-video-xfx-radeon-rx-470-4gb-rx-470p4sfd5-gddr5-pci-exp',
		];
*/
		const uris3 = [
			'http://www.pichau.com.br/placa-de-video-xfx-radeon-rx-470-4g-gddr5-oc-rx-470p4sfd5',
			'http://www.pichau.com.br/perifericos/mouse/mouse-gamer-thermaltake-level-10m-white-edition-mo-ltm009dtj-box',
			'http://www.pichau.com.br/hardware/processadores/processador-intel-core-i7-7700k-kaby-lake-lga-1151-4-2ghz-8mb-cache-bx80677i77700k',
			'http://www.pichau.com.br/eletronicos/consoles-e-acessorios/joystick-usb-logitech-extreme-3d-pro-box',
		];


		stores.createMultipleItemsFromStore(uris3, 'pichau').then(items => res.send(items));
	});
};
