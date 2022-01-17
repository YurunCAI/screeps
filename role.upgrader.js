//role.upgrader

var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep){
        if(creep.memory.upgrade && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.upgrade = false;
        }
        //upgrader to upgrade controller
        if(!creep.memory.upgrade && creep.store.getFreeCapacity() == 0){
            creep.memory.upgrade = true;
        }



        if(!creep.memory.upgrade){
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE){
                creep.moveTo(sources[1]);
            }
        }else{
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }
        }
    }
}
module.exports = roleUpgrader;