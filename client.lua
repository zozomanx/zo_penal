-- Start with Penal Code not showing
local display = false

function SetDisplay(bool)
    display = bool
    SetNuiFocus(bool, bool)
    SendNUIMessage({
        type = "ui",
        status = bool,
    })
end

-- Debug with "Penal" command
--[[ RegisterCommand('Penal', function(_, args)
    if tostring(args[1]) == 'open' then
        SetDisplay(true)
    elseif tostring(args[1]) == 'close' then
        SetDisplay(false)
    else
        print('Command not found!')
        return
    end
end) ]]

RegisterNUICallback("close", function()
    SetNuiFocus(false, false)
    display = false
end)


-- Set ox_target BoxZone
exports.ox_target:addBoxZone({
    coords = vec3(-547.4033, -207.3018, 38.1638), -- CHANGE TO PROPER COORDS
    size = vec3(1, 1, 1),
    rotation = 45,
    debug = false,
    options = {
        {
            name = 'Penal Box',
            event = 'ox_target:zo_penal',
            icon = 'fa-solid fa-book',
            label = 'Read Penal Codes',
        }
    }
})


-- EventHandler for clicking inside of the BoxZone
AddEventHandler('ox_target:zo_penal', function(data)
    if data.entity and GetEntityType(data.entity) > 0 then
        data.archetype = GetEntityArchetypeName(data.entity)
        data.model = GetEntityModel(data.entity)
    end

    SetDisplay(true)
end)