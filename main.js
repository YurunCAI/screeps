//import
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

//main function
module.exports.loop = function(){
    //clear non-existing creeps
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    //Creeps setting
    const numOfHarvester = 3;
    //const bodyOfHarvester = []; //wrong format
    const numOfUpgrader = 4;
    const numOfBuilder = 2;

    //-----------------------------Single Tower Control-----------------------------
    var tower = Game.getObjectById('');
    if(tower){
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) tower.attack(closestHostile);
    }

    //-----------------------------call running role--------------------------------
    for(var name in Game.creeps){
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester'){roleHarvester.run(creep);}//harvester to digging energy
        if(creep.memory.role == 'upgrader'){roleUpgrader.run(creep);}//upgrader to upgrade controller
        if(creep.memory.role == 'builder'){roleBuilder.run(creep);}//builder to biulding
    }
    
    //-----------------------------check number of creeps and spawning--------------------------------
    //spawn new harvester
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // /*    ====TEST==== logging current number of upgraders*/console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < numOfHarvester) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName, { memory: { role: 'harvester' } });
    }
    

    //spawn new upgrader
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // /*    ====TEST==== logging current number of upgraders*/console.log('Upgrader: ' + upgraders.length);

    if (upgraders.length < numOfUpgrader && harvesters.length >= numOfHarvester) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'upgrader' } });
    }

    //spawn new builder
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // /*    ====TEST==== logging current number of upgraders*/console.log('Builder: ' + builders.length);

    if (builders.length < numOfBuilder && upgraders.length >= numOfUpgrader) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName, { memory: { role: 'builder' } });
    }
}