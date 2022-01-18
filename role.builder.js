//role.builder

var roleBuilder = {
    /** @param {Creep} creep **/
    run: function(creep){
        //builder go harvest
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false;
        }
        //builder go building
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.memory.building = true;
        }

        //builder walking to construction sites
        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }else{
                this.repairAll(creep);
            }
        } else { //builder walking to harvest
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    },

    repairAll: function(creep){
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.hits < 5000));
            }
        });
        console.log('Builders Repairing Queue: '+targets.length);
        if(targets.length){
            
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
}
module.exports = roleBuilder;