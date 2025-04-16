import React from 'react';
import {Container, Card} from 'reactstrap';

function Index() {
	return (
		<Container>
			<Card className='mt-5 p-5'>
				<h1 className='display-4'>Jihro S. Abendano</h1>
				<address>
					<a href='mailto:email@address.com'>jihrosabendano@gmai.com</a>
					<br />
					<a href='tel:+635552368'>(+63) 917-123-0966</a>
				</address>
			</Card>
		</Container>
	);
}

export default Index;
