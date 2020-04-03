const jsoncsv = require('json-csv')
//Date,Client,Project,Project Code,Task,Notes,Hours,Billable?,Invoiced?,
// Approved?,First Name,Last Name,Employee?,External Reference URL

//Approved missing.
//First name and Last name are combined
//Employee? missing.
const toMinimalCSV = (items) => {
    const options = {
        fields: [
            {
                name: 'spent_date',
                label: 'Date'
            },
            {
                name: 'notes',
                label: 'Notes'
            },
            {
                name: 'notes',
                label: 'Notes'
            },
            {
                name: 'hours',
                label: 'Hours'
            },
            {
                name: 'user.id',
                label: 'Employee number'
            },
        ],
    }
    return toCSV(items,options)
}

const toCSV= (items,options) => {
    jsoncsv.buffered(items,options,
    (err,csv) => {
        console.log(csv)
    })

}

const toFullCSV = (items) => {
    const options = {
        fields: [
            {
                name: 'spent_date',
                label: 'Date'
            },
            {
                name: 'client.name',
                label: 'Client'
            },
            {
                name: 'project.code',
                label: 'Project Code'
            },
            {
                name: 'task.name',
                label: 'Task'
            },
            {
                name: 'notes',
                label: 'Notes'
            },
            {
                name: 'hours',
                label: 'Hours'
            },
            {
                name: 'billable',
                label: 'Billable?'
            },
            {
                name: 'invoice',
                label: 'Invoiced?'
            },
            {
                name: '',
                label: 'Approved?'
            },
            {
                name: 'user.name',
                label: 'Name'
            },
            {
                name: '',
                label: 'Employee?'
            },
            {
                name: 'external_reference',
                label: 'External Reference URL'
            },
        ]

    }
    return toCSV(items, options)
}

module.exports = {
    toFullCSV,
    toMinimalCSV
}