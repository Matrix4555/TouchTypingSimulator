import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequuntur \
                voluptatem obcaecati nulla voluptates officiis nihil in, inventore aperiam dolorum \
                veritatis porro expedita ad sapiente temporibus exercitationem hic. Tempore beatae porro \
                voluptatibus a, repudiandae dolorem quasi commodi fuga consequatur pariatur.'
        }
    }

    render() {
        return(
            <p className="text-center">{this.state.text}</p>
        );
    }
}
