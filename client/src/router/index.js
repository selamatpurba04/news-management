import Vue from 'vue'
import Router from 'vue-router'
import News from '@/components/News'
import CreateNews from '@/components/CreateNews'
import EditNews from '@/components/EditNews'

import Topic from '@/components/Topic'
import EditTopic from '@/components/EditTopic'
import CreateTopic from '@/components/CreateTopic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'News',
      component: News
    },
    {
      path: '/news/create',
      name: 'CreateNews',
      component : CreateNews
    },
    {
      path: '/news/:id',
      name: 'EditNews',
      component : EditNews
    },
    {
      path: '/topic',
      name: 'Topic',
      component : Topic
    },
    {
      path: '/topic/create',
      name: 'CreateTopic',
      component : CreateTopic
    },
    {
      path: '/topic/:id',
      name: 'EditTopic',
      component : EditTopic
    }
  ],
  mode: 'history'
})
