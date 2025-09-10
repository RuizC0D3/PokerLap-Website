'use client'


const UserInfoVista = (props) => {
    const { logout = console.log, lang = 'es' } = props

    return (
        <>

            <section className="ls s-py-xl-150 s-py-lg-120 s-py-md-80 s-py-50">
                <div className="container">
                    <div className="row">


                        <main className="col-lg-12">
                            <article>
                                <header className="entry-header">
                                    <h1 className="entry-title">Account details</h1>
                                    <span className="edit-link">
                                        <a className="post-edit-link" >Edit
                                            <span className="screen-reader-text"> "My account"
                                            </span>
                                        </a>
                                    </span>
                                </header>
                                <div className="entry-content">
                                    <div className="woocommerce">
                                        <nav className="woocommerce-MyAccount-navigation">
                                            <ul>
                                                {/*  <li>
                                                    <a >Dashboard</a>
                                                </li>
                                                <li>
                                                    <a >Orders</a>
                                                </li>
                                                <li>
                                                    <a >Downloads</a>
                                                </li>
                                                <li>
                                                    <a >Addresses</a>
                                                </li>
                                                <li className="is-active">
                                                    <a >Account details</a>
                                                </li> */}
                                                <li>
                                                    <a className="hover" onClick={(e) => { e.preventDefault(); logout() }}>Logout</a>
                                                </li>
                                            </ul>
                                        </nav>


                                        <div className="woocommerce-MyAccount-content">
                                            <form className="woocommerce-EditAccountForm edit-account" action="#" method="post">


                                                <p className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
                                                    <label for="account_first_name">First name <span className="required">*</span>
                                                    </label>
                                                    {/* <input type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="account_first_name" id="account_first_name" value="" placeholder="First name&nbsp;*" /> */}
                                                </p>
                                                <p className="woocommerce-form-row woocommerce-form-row--last form-row form-row-last">
                                                    <label for="account_last_name">Last name <span className="required">*</span>
                                                    </label>
                                                    {/* <input type="text" className="woocommerce-Input woocommerce-Input--text input-text" name="account_last_name" id="account_last_name" value="" placeholder="Last name&nbsp;*" /> */}
                                                </p>
                                                <div className="clear">

                                                </div>

                                                <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                    <label for="account_email">Email address <span className="required">*</span>
                                                    </label>
                                                    {/* <input type="email" className="woocommerce-Input woocommerce-Input--email input-text" name="account_email" id="account_email" value="admin@test.com" placeholder="Email address&nbsp;*" /> */}
                                                </p>

                                                <fieldset>
                                                    <legend>{/* Password change */}</legend>

                                                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="password_current">Current password (leave blank to leave unchanged)</label>
                                                        {/* <input type="password" className="woocommerce-Input woocommerce-Input--password input-text" name="password_current" id="password_current" placeholder="Current password (leave blank to leave unchanged)" /> */}
                                                    </p>
                                                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="password_1">New password (leave blank to leave unchanged)</label>
                                                        {/* <input type="password" className="woocommerce-Input woocommerce-Input--password input-text" name="password_1" id="password_1" placeholder="New password (leave blank to leave unchanged)" /> */}
                                                    </p>
                                                    <p className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
                                                        <label for="password_2">Confirm new password</label>
                                                        {/* <input type="password" className="woocommerce-Input woocommerce-Input--password input-text" name="password_2" id="password_2" placeholder="Confirm new password" /> */}
                                                    </p>
                                                </fieldset>
                                                <div className="clear"></div>
                                                <p>
                                                    {/* <input type="submit" className="woocommerce-Button button" name="save_account_details" value="Save changes" /> */}
                                                </p>
                                            </form>


                                        </div>
                                    </div>
                                </div>
                            </article>

                        </main>

                    </div>

                </div>
            </section>
        </>

    )
}
export default UserInfoVista




