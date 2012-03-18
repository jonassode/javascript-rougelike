NODES = {};

var tombstone = _tile({
	image : 'tombstone.gif',
	walkable: false,
	height: 53,
	width: 32,
});

NODES.wall = _tile({
	image : 'deep_water.gif',
	walkable : false,
});

NODES.tree = _tile({
	image : 'tree.gif',
	walkable : false,
	height : 64,
	width : 32,
});

NODES.stone = _tile({
	image : 'statue.gif',
	walkable : false,
	height : 53,
	width : 32,
});
 
var water = _tile({
	image : 'water.gif',
	walkable : false,
});

var stairs = _tile({
	image : 'cave_stairs.gif',
});

var monster = {};
monster.create = function(image, name){
	var monster_temp = _tile({
		image : image,
		walkable : false,
	});
	monster_temp.width = 32;
	monster_temp.height = 64;
	monster_temp.defense = 5;
	monster_temp.attack = 5;
	monster_temp.hp = 10;
	monster_temp.object = "monster";
	monster_temp.name = name;
	monster_temp.move = function() {

		var direction = null;
		var distance_to_player = this.distance_to(Index.player);

		if(distance_to_player < 6) {
			direction = this.direction_to(Index.player);
		} else {
			direction = random_direction();
		}

		var pos = this.get_position_from_direction(direction);
		var dest_bg = Index.tilemap.background(pos.row, pos.col);
		var dest_tile = Index.tilemap.get_tile(pos.row, pos.col);

		if(dest_tile != null) {
			if(dest_tile.object == "hero") {
				fight(this, dest_tile);
			}
		} else if(dest_bg.walkable != false) {
			Index.tilemap.move_tile(pos.row, pos.col, this);
		}
	}
	monster_temp.death = function() {
		Index.tilemap.remove(this.row, this.col);
	}
	return monster_temp;
}

NODES.zombie = monster.create("zombie.gif", "Zombie");
NODES.familiar = monster.create("familiar.gif", "familiar");
NODES.familiar.hp = 3;
NODES.familiar.height = 53;
NODES.rat = monster.create("rat.gif", "rat");
NODES.rat.height = 30;
NODES.rat.width = 30;

var player = _tile({
	image : 'man.gif'
});
player.width = 32;
player.height = 64;
player.mp = 20;
player.maxmp = 40;
player.maxhp = 20;
player.hp = player.maxhp;
player.food = 120;
player.level = 1;
player.xp = 0;
player.nextlevel = 100;
player.moved = false;
player.attack = 5;
player.defense = 5;
player.wood = 0;
player.stone = 0;
player.name = "You, the Noble Lord Zedrik";
player.object = "hero";
player.death = function() {
	var row = this.row;
	var col = this.col;

	Index.tilemap.remove(row, col);
	Index.tilemap.place_tile(row, col, NODES.tombstone);

	player.status = "DEAD";
}
player.status = "ALIVE";



NODES.water = water;
NODES.stairs = stairs;
NODES.player = player;
NODES.tombstone = tombstone;

