//Game.creeps['NAME'].store.getUsedCapacity() -> current carry

//role.harvester
var roleHarvester = {
    /** @param {Creep} creep **/
    run: function (creep) {
         //Go harvest
        //builder go harvest
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false;
        }
        //builder go building
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.memory.building = true;
        }
        //transfer energy to spawn and extension
        if(creep.memory.building){
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)&&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            var secondTargets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else if(secondTargets.length > 0){
                if(creep.transfer(secondTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(secondTargets[0])
                }
            }else{
                this.goBuilding(creep);
            }
        }else{//harvesting
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
    },
    //for multiple towers control - fueling towers
    goFueling: function(creep){
        
    },
    //help builder building when spawn fully energy
    goBuilding: function(creep){
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    } 
}
module.exports = roleHarvester;