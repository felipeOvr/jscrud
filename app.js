window.onload = () => {

    const getElement = selector => document.querySelector ( selector )

    const table = getElement ( '.users-table' )
    const button = getElement ( 'button[type=submit]' )

    function updateTable ()
    {
        if ( getStorage().length )
        {
            getStorage().forEach(user => {

                let tr = document.createElement ( 'tr' )

                tr.setAttribute ( 'data-code', user._id )

                tr.innerHTML = `
                    <td>${ user._id }</td>
                    <td contenteditable>${ user.username }</td>
                    <td contenteditable>${ user.useremail }</td>
                `

                table.append ( tr )
            })
        }
    }

    // H

    function setStorage (data)
    {
        localStorage.localhostDB = JsonToString (data)
    }

    function getStorage ()
    {
        if ( ! localStorage.localhostDB )
        {
            localStorage.localhostDB = JsonToString ([])
        }

        return stringToJson (localStorage.localhostDB)
    }

    function JsonToString (data)
    {
        return JSON.stringify (data)
    }

    function stringToJson (data)
    {
        return JSON.parse (data)
    }

    function clearTable ()
    {
        if ( table.children.length > 0 )
        {
            [...table.rows].forEach ( () => table.deleteRow ( 0 ) )
        }
    }

    // A

    button.addEventListener ( 'click', event => {

        event.preventDefault ()

        const userName = getElement ('input[name=username]').value
        const userEmail = getElement ('input[name=useremail]').value

        let database = getStorage()

        database.push ({

            _id: (new Date).getTime(),
            username: userName,
            useremail: userEmail
        })

        setStorage ( database )

        getElement('form').reset()

        clearTable()
        updateTable()
    } )

    updateTable()

    getElement ( '.deleteDB' ).onclick = () => {

        if ( confirm ( 'Todos os dados serão deletados, prosseguir com a ação?' ) )
        {
            localStorage.clear()

            alert ( 'base de dados deletada !' )

            clearTable()
        }
    }
}

//