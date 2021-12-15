function _creatModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">
                    Register
                </span>
                ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
            </div>
            <div class="modal-body">
                <p>
                    Email
                </p>
                <div class="input-data">
                    <input class="reg-email" type="email" id="email" placeholder="@mail" name="email">
                </div>
                <p>
                    Password
                </p>
                <div class="input-data">
                    <input class="reg-password" type="password" id="password" placeholder="Password" name="password">
                </div>
            </div>
            <div class="modal-footer">
                <div class="button-reg">
                    <div>
                        <button>Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `)
    document.body.appendChild(modal)
    return modal
}

$.modal = function (options) {
    const ANIMATION_SPEED = 200
    const $modal = _creatModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        }
    }
    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }
    const modalButtons = document.querySelectorAll('.modalB')
    modalButtons.forEach(btn => btn.addEventListener('click', modal.open))

    $modal.addEventListener('click', listener)
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        }
    })
}