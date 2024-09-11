import PostIt from '@/components/PostIt.vue'
import { shallowMount } from '@vue/test-utils'


//contenue du postit
//bouton delete test
//test drogging et position
//test resize

describe('Postit.vue', () => {
    const postIt = {
        id: 1,
        content: "test",
        x: 100,
        y: 100,
        width: 200,
        height: 200,
        color: "red",
        fontFamily: "arial",
        fontSize: "18px",
        fontWeight: "normal",
        fontStyle: "normal",
    }

    it('write in the postit', () => {
        const wrapper = shallowMount(PostIt, {
            props: {
                postIt,
                onUpdate: jest.fn(),
                onDelete: jest.fn()
            }
        });
        const textarea = wrapper.find('textarea');

        expect(textarea.element.value).toBe('test')

    });

    it('close the postit', async () => {
        const onDelete = jest.fn()
        const wrapper = shallowMount(PostIt, {
            props: {
                postIt,
                onUpdate: jest.fn(),
                onDelete
            }
        });
        const cliquedelete = wrapper.find('.close')
        await cliquedelete.trigger('click')

        expect(onDelete).toHaveBeenCalledWith(1)
    });

    it('move the postit', async () => {
        const onUpdate = jest.fn()
        const wrapper = shallowMount(PostIt, {
            props: {
                postIt,
                onUpdate,
                onDelete: jest.fn(),
            }
        });


        await wrapper.trigger("mousedown", { clientX: 150, clientY: 150 })

        await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 160, clientY: 160 }))

        await window.dispatchEvent(new MouseEvent('mouseup'))

        expect(onUpdate).toHaveBeenCalledWith({
            ...postIt,
            x: 110,
            y: 110,
        })
    });

    it('resize the postit', async () => {
        const onUpdate = jest.fn()
        const wrapper = shallowMount(PostIt, {
            props: {
                postIt,
                onUpdate,
                onDelete: jest.fn(),
            }
        });

        const resizeHandle = wrapper.find('div[style*="se-resize"]');

        await resizeHandle.trigger("mousedown", { clientX: 300, clientY: 300 })

        await window.dispatchEvent(new MouseEvent('mousemove', { clientX: 310, clientY: 310 }))

        await window.dispatchEvent(new MouseEvent('mouseup'))

        expect(onUpdate).toHaveBeenCalledWith({
            ...postIt,
            height:210,
            width:210
        })
    });

})
