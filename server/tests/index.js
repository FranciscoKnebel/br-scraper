const stores = require('../../stores');

module.exports = (app) => {
	app.get('/test/single', (req, res) => {
		// const uri = 'http://www.kabum.com.br/produto/80660/placa-mae-asus-p-intel-lga-1151-matx-b150m-pro-ga-';
		// const uri2 = 'http://www.terabyteshop.com.br/produto/6944/placa-de-video-xfx-radeon-r7-250x-2gb-gddr3-r7-250x-cgf4-pci-exp';
		// const uri3 = 'http://www.pichau.com.br/placa-de-video-xfx-radeon-rx-470-4g-gddr5-oc-rx-470p4sfd5';
		// const uri4 = 'http://www.balaodainformatica.com.br/Produto/107959/iPhone-7-Apple-32GB-Prateado-iOS-10-4G-Tela-retina-47-Processador-A10-Camera-12MP-Filma-em-4k';
		const uri5 = 'http://www.americanas.com.br/produto/127531749/smartphone-motorola-moto-g-3-geracao-dual-chip-android-5.1-tela-5-16gb-camera-13mp-preto-3-capas?condition=NEW&hl=lower&oferta=3132373533313735372e30303737363537343030303636302e4e455';

		stores.createItemFromStore(uri5, 'americanas').then(item => res.send(item));
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

		const uris4 = [
			'http://www.balaodainformatica.com.br/Produto/106231/Seminovo-Smartphone-Motorola-Moto-G-3-Geracao-Colors-XT1543-Quad-Core-Android-511-Tela-50-16GB-13MP-4G-Cor-Preto',
			'http://www.balaodainformatica.com.br/Produto/107958',
			'http://www.balaodainformatica.com.br/Produto/108056',
			'http://www.balaodainformatica.com.br/Produto/91832/Processador-Intel-i3-6100-37GHZ-3Mb-G6-LGA-1151-Skylake-1659',
		];

		const uris5 = [
			'http://www.americanas.com.br/produto/127531749/smartphone-motorola-moto-g-3-geracao-dual-chip-android-5.1-tela-5-16gb-camera-13mp-preto-3-capas?condition=NEW&hl=lower&oferta=3132373533313735372e30303737363537343030303636302e4e4557',
			'http://www.americanas.com.br/produto/129505798/tv-led-40-semp-toshiba-full-hd-com-conversor-digital-3-hdmi-1-usb-l40d2900?chave=prf_hm_0_oh_1_txar&condition=NEW',
			'http://www.americanas.com.br/produto/127782290/smartphone-motorola-moto-g-3-geracao-dual-chip-android-5.1.1-lollipop-tela-5-8gb-cartao-de-memoria-8gb-preto?DCSext.recom=RR_item_page.rr1-PersonalizedClickCPInCategory&condition=NEW&nm_origem=rec_item_page.rr1-PersonalizedClickCPInCategory&nm_ranking_rec=4',
			'http://www.americanas.com.br/produto/124196148/smartphone-samsung-galaxy-j7-duos-dual-chip-android-5.1-tela-5.5-16gb-4g-camera-13mp-dourado?DCSext.recom=RR_item_page.rr2-ClickCP&condition=NEW&nm_origem=rec_item_page.rr2-ClickCP&nm_ranking_rec=3',
		];


		stores.createMultipleItemsFromStore(uris5, 'americanas').then(items => res.send(items));
	});
};
