import Header from '../shared/Header';


const BaseLayout = props => {
    const { children } = props;
    return (
        <div className="layout-container">
            <Header />
            <main>
                <div style={{ marginLeft: '50px', marginTop: '20px' }}>
                    {children}
                </div>
            </main>
            
        </div>
    )
}

export default BaseLayout;