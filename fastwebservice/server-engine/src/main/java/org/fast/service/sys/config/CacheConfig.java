package org.fast.service.sys.config;

import org.fast.service.model.sysmodel.core.service.impl.UserServiceImpl;
import org.fast.service.model.sysmodel.core.service.intf.UserServiceIntf;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import redis.clients.jedis.JedisPoolConfig;

import java.util.ArrayList;

/**
 * Description:  缓存管理器，包含redis和ehcache管理器
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/9/25
 */

@Configuration
@EnableCaching
public class CacheConfig {

    /**
     * 配置缓存管理器集合协调器，协调器可以集成多种缓存管理器，但是spring ioc容器中只能有一个cacheManager的实现bean
     * 协调器查找或存取缓存的顺序是根据集合内的先后顺序决定的
     */
//    @Bean
//    public CacheManager cacheManager(net.sf.ehcache.CacheManager cm, RedisTemplate redisTemplate) {
//        CompositeCacheManager cacheManager = new CompositeCacheManager();
//        List caches = new ArrayList<Object>() {
//            {
//                add(new EhCacheCacheManager(cm));
//                add(new RedisCacheManager(redisTemplate));
//            }
//        };
//        cacheManager.setCacheManagers(caches);
//        return cacheManager;
//    }


//    @Bean
//    public EhCacheManagerFactoryBean ehcache(SpringContextUtil contextUtil) {
//        EhCacheManagerFactoryBean ehCacheManagerFactoryBean = new EhCacheManagerFactoryBean();
//        Resource r = contextUtil.getApplicationContext().getResource("WEB-INF/classes/ehcache.xml");
//        ehCacheManagerFactoryBean.setConfigLocation(r);
//        return ehCacheManagerFactoryBean;
//    }

//    @Bean
//    public EhCacheCacheManager ehcacheManager(CacheManager cm) {
//        return new EhCacheCacheManager(cm);
//    }
    @Bean
    public UserServiceIntf userServiceIntf() {
        return new UserServiceImpl();
    }

    @Bean
    public CacheManager cacheManager(RedisTemplate redisTemplate) {
        return new RedisCacheManager(redisTemplate, new ArrayList<String>() {
            {
                add("redisCache");
            }
        });
    }

    @Bean
    public JedisPoolConfig config() {
        JedisPoolConfig config = new JedisPoolConfig();
        config.setMinEvictableIdleTimeMillis(1200000);//20分钟空闲超时断开连接
        config.setMinIdle(1);//保留一个空闲连接
        config.setTestOnBorrow(true);//检查连接有效性
        return config;
    }

    @Bean
    public JedisConnectionFactory redisConnectionFactory(JedisPoolConfig config, Environment properties) {
        JedisConnectionFactory jedisConnectionFactory = new JedisConnectionFactory();
        jedisConnectionFactory.setHostName(properties.getProperty("redis.url"));
        jedisConnectionFactory.setPort(Integer.parseInt(properties.getProperty("redis.port")));
        jedisConnectionFactory.setPassword(properties.getProperty("redis.password"));
        jedisConnectionFactory.setPoolConfig(config);
        jedisConnectionFactory.afterPropertiesSet();
        return jedisConnectionFactory;
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory);
        redisTemplate.afterPropertiesSet();
        return redisTemplate;
    }

}
