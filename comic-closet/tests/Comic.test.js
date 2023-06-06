import next from 'next';
import moment from 'moment';
import { Comic } from '../src/pages/components/Comic'
import "@testing-library/jest-dom";
import { fireEvent, render, screen, cleanup, waitForElement } from "@testing-library/react";
import { afterEach } from 'node:test';

afterEach(cleanup);

const comic = {
    id: 1234,
    title: "Test Title",
    issueNumber: 5678,
    dates: [
        {
            type: 'Test Date Type',
            date: '2023-05-31T00:00:00-0400'
        }
    ],
    creators: {
        items: [
            {
                name: 'Name One'
            },
            {
                name: 'Name Two'
            }
        ]
    },
    thumbnail: {
        extension: 'jpg',
        path: 'http://i.annihil.us/u/prod/marel/i/mg/b/40/image_not_available'
    }
}

test('<Comic /> with no props', () => {
    const { queryByTestId } = render(<Comic />);
    const comicWrapper = queryByTestId('comic-parent');
    expect(comicWrapper).not.toBeInTheDocument();
})

test('<Comic />', async () => {
    const { queryByTestId, getByTestId, debug } = render(<Comic comicData={comic}/>);
    const creators = comic.creators.items.map(creator => creator.name).join(', ');
    const comicPublishDate = comic.dates[0].date;
    const formattedDate = moment(comicPublishDate).format('MMMM DD, YYYY');

    expect(getByTestId('comic-title').textContent).toBe(comic.title);
    expect(getByTestId('comic-issueNumber').textContent).toBe(`Issue: ${comic.issueNumber}`);
    expect(getByTestId('comic-publishDate').textContent).toBe(`Published: ${formattedDate}`);
    expect(getByTestId('comic-creators').textContent).toBe(`Creators: ${creators}`);

})