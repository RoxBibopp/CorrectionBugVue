// contenu du postit correctement rendu
// bouton delete
// start draging et la position à jour
//  resize
import PostIt from '@/components/PostIt.vue';
import { shallowMount } from '@vue/test-utils';

describe('PostIt', () => {
    const postIt = {
        id: 1,
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        color: 'rgb(0, 0, 255)',
        fontFamily: 'Arial',
        fontSize: '14px',
        fontWeight: 'normal',
        fontStyle: 'normal',
        content: 'Contain'
    };
     it('Should display the right message', () => {
        const wrapper = shallowMount(PostIt, {
            props:{
                postIt,
                onUpdate: jest.fn(),
                onDelete: jest.fn()
            }
        });
        const textarea = wrapper.find('textarea');
        expect(textarea.element.value).toBe('Contain');
    });
    it('Should delete the postit', async () => {
        const onDelete = jest.fn();
        const wrapper = shallowMount(PostIt, {
            props:{
                postIt,
                onUpdate: jest.fn(),
                onDelete
            }
        });
        const deleteButton = wrapper.find('.close');
        await deleteButton.trigger('click');
        expect(onDelete).toHaveBeenCalledWith(postIt.id);
    });
    it('Should dragging the postit', async () => {
        const onUpdate = jest.fn()
        const wrapper = shallowMount(PostIt, {
            props: {
                postIt,
                onUpdate,
                onDelete: jest.fn()
            }
        });
        const postItElement = wrapper.find('.postit');
        await postItElement.trigger('mousedown', {clientX: 150, clientY:150});
        window.dispatchEvent(new MouseEvent('mousemove', {clientX: 200, clientY:200}));
        window.dispatchEvent(new MouseEvent('mouseup'));

        const posX = postIt.x + (200-150);
        const posY = postIt.y + (200-150);
        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            x: posX,
            y: posY
        }));
    });
    it('Should resize the postit', async () => {
        const onUpdate = jest.fn()
        const wrapper = shallowMount(PostIt, {
            props: {
                postIt,
                onUpdate,
                onDelete: jest.fn()
            }
        });
        const resizeHandle = wrapper.find('div[style*="se-resize"]');
        expect(resizeHandle.exists()).toBe(true);

        await resizeHandle.trigger('mousedown', {clientX: 200, clientY:200});
        window.dispatchEvent(new MouseEvent('mousemove', {clientX: 230, clientY:230}));
        window.dispatchEvent(new MouseEvent('mouseup'));

        const posWidth = postIt.width + (230-200);
        const posHeight = postIt.height + (230-200);

        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
            width: posWidth,
            height: posHeight
        }));
    })
});